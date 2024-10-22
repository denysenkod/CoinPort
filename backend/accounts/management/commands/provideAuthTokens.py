# Import the UserAccount model
from accounts.models import UserAccount
# Import Token model from the Rest framework 
from rest_framework.authtoken.models import Token
# Import BaseCommand from the Django core management library
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    '''Script designed to store a unique security tokens of users which registered an account in the application'''

    def handle(self, *args, **kwargs):
        # Iterate over all users with accounts
        for user in UserAccount.objects.all():
            # Update or create the token for each user
            Token.objects.get_or_create(user=user)
        # Print a message that the script has been executed
        self.stdout.write(self.style.SUCCESS('Tokens provided successfully!'))







        