# Import necessary modules and classes.
from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from django.contrib.auth import get_user_model, authenticate # Authentication utilities.
from rest_framework import serializers # Base serializer classes.
from .models import Coin, Transaction, Portfolio, PortfolioHistory # Import models for serialization.
from rest_framework.authtoken.models import Token # Token model for auth tokens.
from django.utils.translation import gettext as _ # For internationalization.

# Retrieve the custom user model defined in the project.
User = get_user_model()

# Custom serializer for user creation, inheriting from Djoser's UserCreateSerializer.
class UserCreateSerializer(DjoserUserCreateSerializer):
    class Meta(DjoserUserCreateSerializer.Meta):
        model = User # Specifies the custom user model.
        fields = ("id", "email", "username", "password") # Fields to be included in the serialized data.

# Serializer for the Coin model.
class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin # Specifies the Coin model.
        fields = ['id', 'name', 'symbol', 'image']  # Fields to include in serialization.

# Serializer for the Transaction model.
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction # Specifies the Transaction model.
        fields = ['portfolioId', 'coin', 'transaction_type', 'quantity', 'price_per_coin', 'comments'] # Fields to include.

# Serializer for the Portfolio model.
class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio  # Specifies the Portfolio model.
        fields = ['id', 'name', 'created_at']  # Fields to include.
        read_only_fields = ('user', 'created_at')  # Fields that cannot be modified directly.

# Serializer for the PortfolioHistory model.
class PortfolioHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioHistory # Specifies the PortfolioHistory model.
        fields = ['date_time', 'total_value'] # Fields to include.

# Serializer for the Token model.
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token  # Specifies the Token model.
        fields = ['token']  # Include only the token field.

# Serializer for authentication tokens.
class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255, trim_whitespace=False)

    # Custom validation method to authenticate users.
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        # Attempt to authenticate the user based on email and password.
        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password
        )

        # If authentication fails, raise an error.
        if not user:
            msg = _("Unable to authenticate with provided credentials")
            raise serializers.ValidationError(msg, code="authorisation")

        # If successful, include the user object in the validated data.
        attrs["user"] = user

        return attrs



