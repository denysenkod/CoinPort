# Import necessary Django and DRF modules for views and response handling.
from django.shortcuts import render
from rest_framework import generics, status
from .models import Coin, Transaction, Portfolio, PortfolioHistory
from .serializers import CoinSerializer, TransactionSerializer, TokenSerializer, AuthTokenSerializer, PortfolioSerializer, PortfolioHistorySerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from django.conf import settings
from django.http import JsonResponse
import asyncio
from accounts.calculations import run_script


# View for listing all Coin objects. Allows access to any user.
class ListCoinsView(generics.ListAPIView):
    queryset = Coin.objects.all()  # Fetches all Coin objects.
    serializer_class = CoinSerializer  # Uses CoinSerializer to serialize data.
    permission_classes = [AllowAny]  # No authentication required to access this view.

# View for listing all Transaction objects. Allows access to any user.
class TransactionsView(generics.ListAPIView):
    queryset = Transaction.objects.all()  # Fetches all Transaction objects.
    serializer_class = TransactionSerializer  # Uses TransactionSerializer to serialize data.
    permission_classes = [AllowAny]  # No authentication required to access this view.

# View for listing PortfolioHistory objects for a specific portfolio.
class PortfolioHistoryView(generics.ListAPIView):
    serializer_class = PortfolioHistorySerializer  # Uses PortfolioHistorySerializer to serialize data.
    permission_classes = [AllowAny]  # No authentication required to access this view.
    
    def get_queryset(self):
        """
        This view should return a list of all the portfolio history
        for the portfolio as determined by the portfolio_id portion of the URL.
        """
        portfolio_id = self.kwargs['portfolio_id']
        return PortfolioHistory.objects.filter(portfolio__id=portfolio_id)

# View for listing Portfolio objects for the authenticated user.
class PortfolioView(generics.ListAPIView):
    serializer_class = PortfolioSerializer # Uses PortfolioSerializer to serialize data.
    authentication_classes = [TokenAuthentication] # Uses TokenAuthentication for authenticating users.
    permission_classes = [IsAuthenticated] # Requires the user to be authenticated.

    def get_queryset(self):
        '''
        Fetches Portfolio objects related to the authenticated user.
        '''
        user = self.request.user
        return Portfolio.objects.filter(user=user)


# View for listing all Token objects. Requires user to be authenticated.
class TokenView(generics.ListAPIView):
    queryset = Token.objects.all()  # Fetches all Token objects.
    serializer_class = TokenSerializer  # Uses TokenSerializer to serialize data.
    authentication_classes = [TokenAuthentication]  # Uses TokenAuthentication for authenticating users.
    permission_classes = [IsAuthenticated]  # Requires the user to be authenticated.

# Custom view for obtaining auth token, setting it in a cookie.
class CustomObtainAuthTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer # Uses AuthTokenSerializer to validate user credentials.

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs) # Calls the superclass method to obtain the token.

        if response.status_code == 200:
            token = response.data.get('token') # Extracts token from response data.

            # Sets the token in a cookie with various security settings.
            response.set_cookie(
                settings.AUTH_COOKIE,
                token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response

# API view for adding a new transaction.
@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def add_transaction(request):
    if request.method == "POST":
        serializer = TransactionSerializer(data=request.data) # Serializes the request data.
        if serializer.is_valid():
            serializer.save() # Saves the transaction if data is valid.
            return Response(serializer.data, status=status.HTTP_201_CREATED) # Returns success response.
        print(serializer.errors)
        # Returns error response if data is invalid.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Function-based view for creating a portfolio, accessible only by authenticated users.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_portfolio(request):
    if request.method == "POST":
        serializer = PortfolioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Django view for fetching and returning portfolio data as JSON.
def portfolio_data(request, id):
    data = run_script(id) # run_script performs complex calculations.
    
    return JsonResponse(data) # Return the data as a JSON response.

