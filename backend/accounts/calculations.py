# Import required modules and models.
from accounts.models import Coin, Portfolio, Transaction
import requests, json, asyncio, aiohttp
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# CoinGecko API URL for fetching coin data, including a placeholder for coin ID.
COINGECKO_API_KEY = os.getenv('COINGECKO_API_KEY')
url = "https://pro-api.coingecko.com/api/v3/coins/{}?&x_cg_pro_api_key=" + COINGECKO_API_KEY

def run_script(id):
    # Fetch the portfolio and its transactions.
    portfolio = Portfolio.objects.get(pk=id)  
    transactions = Transaction.objects.filter(portfolioId=portfolio)

    # Initialize variables to store calculations and coin data.
    coins = []
    current_price_of_coins = {}
    total_cost = {}
    total_quantity = {}
    total_realized_profit_and_loss = {}
    total_unrealized_profit_and_loss = {}
    percentage_change_in_price = {}
    image = {}
    name={}
    symbol = {}
    hour_day_week_list_percentage_change = {}
    market_cap = {}
    holdings = {}

    portfolio_name = portfolio.name
    
    # Prepare data structures for calculations.
    for transaction in transactions:
        total_quantity[transaction.coin.id] = 0
        total_cost[transaction.coin.id] = 0
        total_realized_profit_and_loss[transaction.coin.id] = 0
        total_unrealized_profit_and_loss[transaction.coin.id] = 0


    for transaction in transactions:
        coins.append(transaction.coin.id)
        if transaction.transaction_type == "BUY":
            # Calculate profit/loss for buy transactions.
            total_quantity[transaction.coin.id] += float(transaction.quantity)
            total_cost[transaction.coin.id] += float(transaction.quantity) * float(transaction.price_per_coin)
        else:
            # Calculate profit/loss for sell transactions.
            average_cost = total_cost[transaction.coin.id] / total_quantity[transaction.coin.id]
            profit_and_loss = float(transaction.quantity) * (float(transaction.price_per_coin) - average_cost)
            total_cost[transaction.coin.id] -= average_cost * float(transaction.quantity)
            total_quantity[transaction.coin.id] -= float(transaction.quantity)
            total_realized_profit_and_loss[transaction.coin.id] += profit_and_loss

    # A function which creates a list of coroutine tasks for fetching data for each coin.
    # The `url.format(coin)` dynamically inserts the coin ID into the URL.
    # `ssl=False` is used to bypass SSL verification, but this might not be safe for production code.
    def get_tasks(session):
        tasks = []
        for coin in coins:
            tasks.append(asyncio.create_task(session.get(url.format(coin), ssl=False)))
        return tasks

    # Define an asynchronous function to fetch current prices and other data for each coin.
    async def calculate_portfolio_pl():
        # Use aiohttp's ClientSession for making asynchronous HTTP requests.
        async with aiohttp.ClientSession() as session:
            # Assign a list of coroutine tasks
            tasks = get_tasks(session) 
            # `asyncio.gather` runs tasks concurrently and waits for all to complete.
            # It returns a list of responses from each task.
            responses = await asyncio.gather(*tasks)
            # Iterate over the responses to extract and process the JSON data.
            for response in responses:
                # Read the JSON content from the response
                data = await response.json()

                # Extract specific data from the response and store it in dictionaries.
                current_price_of_coins[data['id']] = data['market_data']['current_price']['usd']
                image[data['id']] = data["image"]["large"]
                name[data['id']] = data["name"]
                symbol[data['id']] = data["symbol"]
                hour_day_week_list_percentage_change[data['id']] = [data["market_data"]["price_change_percentage_1h_in_currency"]["usd"], 
                                                                    data["market_data"]["price_change_percentage_24h"], 
                                                                    data["market_data"]["price_change_percentage_7d"]]
                market_cap[data['id']] = data["market_data"]["market_cap"]["usd"]
    
    # Execute the asynchronous function using asyncio.run.
    # This is the entry point for running asyncio tasks and ensures the function runs to completion.
    # It blocks until all fetch operations are completed and data is processed.
    asyncio.run(calculate_portfolio_pl())

    # Final calculations for each coin in the portfolio.
    for transaction in transactions:
        average_cost = total_cost[transaction.coin.id] / total_quantity[transaction.coin.id]
        holdings[transaction.coin.id] = total_quantity[transaction.coin.id] * current_price_of_coins[transaction.coin.id]
        percentage_change_in_price[transaction.coin.id] = ((current_price_of_coins[transaction.coin.id] - average_cost) / average_cost) * 100
        total_unrealized_profit_and_loss[transaction.coin.id] = current_price_of_coins[transaction.coin.id] * total_quantity[transaction.coin.id]- average_cost * total_quantity[transaction.coin.id]

    # Compile and return the final data structure.
    object_to_return = {}
    for i in name.keys():
        object_to_return[i] = {"name": name[i], 
                               "symbol": symbol[i], 
                               "image": image[i],
                               "total_quantity": total_quantity[i], 
                               "holdings": holdings[i],
                               "market_cap": market_cap[i], 
                               "hour_day_week_list_percentage_change": hour_day_week_list_percentage_change[i], 
                               "percentage_change_in_price": percentage_change_in_price[i], 
                               "total_unrealized_profit_and_loss": total_unrealized_profit_and_loss[i], 
                               "total_realized_profit_and_loss": total_realized_profit_and_loss[i], 
                               "current_price_of_coins": current_price_of_coins[i], 
                               "portfolio_name": portfolio_name
                               }
    
    return object_to_return


