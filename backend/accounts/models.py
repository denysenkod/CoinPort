# Import necessary Django modules for defining models, managing user authentication, and configuration.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save  # For triggering actions after saving a model instance.
from django.dispatch import receiver # For receiving signals.
from rest_framework.authtoken.models import Token # For generating user authentication tokens.
from django.contrib import admin # For admin site functionalities.

# Custom user manager for creating user and superuser with email as the identifier.
class UserAccountManager(BaseUserManager):
    # Function to create a regular user with email, username, and password.
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must provide an email address")
        
        email = self.normalize_email(email) # Normalize the email address.
        user = self.model(email=email, username=username)  # Create a new UserAccount instance.

        user.set_password(password)  # Set user's password.
        user.save() # Save the user instance to the database.

        return user
    
    # Function to create a superuser with email, username, and password.
    def create_superuser(self, username, email, password):
        user=self.create_user(
            username,
            email,
            password=password
        )
        user.is_admin = True # Grant admin rights.
        user.is_superuser = True # Grant superuser rights.
        user.is_active = True # Activate the user account.
        user.is_staff = True # Allow access to the admin site.
        user.save()
        return user

# Custom user model extending AbstractBaseUser and PermissionsMixin.
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=256, unique=True)  # Unique email field for authentication.
    username = models.CharField(max_length=256) # Username field.
    is_active = models.BooleanField(default=True) # Flag to determine if the user is active.
    is_staff = models.BooleanField(default=False) # Determines if user can access the Django admin.

    objects = UserAccountManager() # Assigning the custom manager to the UserAccount model.

    USERNAME_FIELD = "email" # Use email as the login identifier.
    REQUIRED_FIELDS = ["username"] # Required fields apart from password and USERNAME_FIELD.

    # Return the username as the full name.
    def get_full_name(self):
        return self.username
    
    # Return email address when UserAccount instance is printed.
    def __str__(self):
        return self.email
    
    # Signal receiver to create an auth token for new users.
    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)  # Create a Token for new users.

# Model for storing portfolio information linked to a user. 
class Portfolio(models.Model):
    id = models.AutoField(primary_key=True) # Uniqie identifier
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="portfolios") # Link to a UserAccount.

    name = models.CharField(max_length=64, default="My Portfolio") # Portfolio name.
    created_at = models.DateTimeField(auto_now_add=True) # Timestamp of creation.

# Model representing individual cryptocurrencies.
class Coin(models.Model):
    id = models.CharField(max_length=50, primary_key=True) # Coin identifier.
    name = models.CharField(max_length=256) # Coin name.
    symbol = models.CharField(max_length=10) # Coin symbol (e.g., BTC for Bitcoin).
    image = models.CharField() # URL to the coin's image.

# Model for recording transactions within a portfolio.
class Transaction(models.Model):
    # Constants for transaction types.
    BUY = "BUY"
    SELL = "SELL"

    TRANSACTION_TYPES = [
        (BUY, "Buy"),
        (SELL, "Sell")
    ]

    portfolioId = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name="transactions") # Link to Portfolio.
    
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE) # Link to Coin.

    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPES) # Type of transaction.

    quantity = models.DecimalField(max_digits=30, decimal_places=8) # Amount of coin involved in the transaction.

    price_per_coin = models.DecimalField(max_digits=30, decimal_places=8) # Price per coin at transaction time.

    transaction_date = models.DateTimeField(auto_now_add=True) # Timestamp of the transaction.

    comments = models.TextField(blank=True, null=True) # Optional comments or notes on the transaction.

# Model for tracking the historical value of a portfolio over time.
class PortfolioHistory(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE) # Link to Portfolio.

    date_time = models.DateTimeField(auto_now_add = True) # Timestamp of the value record.
    
    total_value = models.DecimalField(max_digits=30, decimal_places=8) # Total value of the portfolio at this timestamp.



