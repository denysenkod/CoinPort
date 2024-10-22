# Import shared_task decorator from Celery to define a task.
from celery import shared_task
# Import necessary models.
from .models import Portfolio, PortfolioHistory, Transaction
# Import asyncio for asynchronous operations.
import asyncio
# Import aiohttp for making async HTTP requests.
import aiohttp

# URL template for CoinGecko API requests, including a placeholder for coin IDs and an API key.
url = "https://pro-api.coingecko.com/api/v3/coins/{}?&x_cg_pro_api_key=CG-KoQX65qXJc75y6buWtSQXtDP"

# Define a Celery task to save portfolio values for each portfolio.
@shared_task
def save_portfolio_values():
    # Iterate over all Portfolio instances.
    for portfolio in Portfolio.objects.all():
        # Calculate the total value of the portfolio.
        total_value = calculate_portfolio_value(portfolio)
        # Create a new PortfolioHistory instance to record the portfolio's total value at this point in time.
        PortfolioHistory.objects.create(portfolio=portfolio, total_value=total_value)

# Function to calculate the total value of a portfolio.
def calculate_portfolio_value(portfolio):
    # Fetch all transactions related to the portfolio.
    transactions = Transaction.objects.filter(portfolioId=portfolio)
    # Initialize dictionaries to track total cost, quantity, and current prices of coins.
    total_cost = {}
    total_quantity = {}
    current_price_of_coins = {}
    holdings = {}

    coins = []  # List to keep track of unique coins in the portfolio.

    # Initialize quantity, cost, and holdings data structures.
    for transaction in transactions:
        total_quantity[transaction.coin.id] = 0
        total_cost[transaction.coin.id] = 0
        holdings[transaction.coin.id] = 0

    for transaction in transactions:
        coins.append(transaction.coin.id) # Ensure each coin is appended.
        # Modify total cost and total quantity for "BUY" transactions.
        if transaction.transaction_type == "BUY":
            total_quantity[transaction.coin.id] += float(transaction.quantity)
            total_cost[transaction.coin.id] += float(transaction.quantity) * float(transaction.price_per_coin)
        # For "SELL" transactions, adjust the total quantity and cost accordingly.
        else: 
            average_cost = total_cost[transaction.coin.id] / total_quantity[transaction.coin.id]
            total_cost[transaction.coin.id] -= average_cost * float(transaction.quantity)
            total_quantity[transaction.coin.id] -= float(transaction.quantity)

    # Function which creates a list of coroutine tasks for fetching data for each coin.
    def get_tasks(session):
        tasks = []
        for coin in coins:
            tasks.append(asyncio.create_task(session.get(url.format(coin), ssl=False)))
        return tasks
    
    # Define an asynchronous function to fetch current prices and other data for each coin.
    async def fetch_coin_price():
        async with aiohttp.ClientSession() as session:
            tasks = get_tasks(session)
            responses = await asyncio.gather(*tasks)
            for response in responses:
                data = await response.json()  
                current_price_of_coins[data['id']] = data['market_data']['current_price']['usd']


    # Execute the asynchronous function using asyncio.run.
    asyncio.run(fetch_coin_price())

        
    
    # Calculate the holdings (current value) for each coin.
    for transaction in transactions:
        holdings[transaction.coin.id] = total_quantity[transaction.coin.id] * current_price_of_coins[transaction.coin.id]
        
    # Return the sum of all holdings as the total portfolio value.
    return sum(holdings.values())
