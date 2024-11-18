# Import necessary Django base command class and requests library for making HTTP requests.
from django.core.management.base import BaseCommand
import requests
# Import the Coin model
from accounts.models import Coin 

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# CoinGecko API URL for fetching coin data, including a placeholder for coin ID.
COINGECKO_API_KEY = os.getenv('COINGECKO_API_KEY')


# Defines a new Command class inheriting from BaseCommand.
class Command(BaseCommand):
    '''Scipt is designed to get a list of top 1000 coins by market capitalisation
    from an API and store it in the database in the Coin table'''

    # The handle method contains the logic executed by the script.
    def handle(self, *args, **kwargs):
        coins = [] # Initialize an empty list to hold coin data.

        # Loops through the first 4 pages of the CoinGecko API.
        for i in range(1,5):
            # Makes a GET request to the CoinGecko API for an array of coins.
            responce = requests.get(f"https://pro-api.coingecko.com/api/v3/coins?per_page=250&page={i}vs_currency=usd&x_cg_pro_api_key={COINGECKO_API_KEY}")
            # Iterate through the JSON response, adding valid coins to the coins list.
            for i in responce.json():
                # Check if the coin's image is missing and print a message if it is.
                if i["image"]["small"] == "missing_small.png":
                    print("missing URL of", i["name"])
                else:
                    # Add the coin to the list.
                    coins.append(i)
                
        # Iterate through the collected coins list.
        for coin in coins:
            # Extract necessary data from each coin.
            id=coin["id"] 
            name=coin["name"]
            symbol=coin["symbol"].upper()
            image=coin["image"]["small"]

            # Update or create a Coin record in the database with the fetched data.
            Coin.objects.update_or_create(id=id , name=name, symbol=symbol, image=image)
        
        # Print a success message to the console once all coins are updated.
        self.stdout.write(self.style.SUCCESS('Coins updated successfully!'))