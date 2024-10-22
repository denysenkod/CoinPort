import sys
sys.path.append("..")

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import ListCoinsView, TransactionsView, PortfolioView, PortfolioHistoryView
from accounts import views
from accounts.views import CustomObtainAuthTokenView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path("api/coins/", ListCoinsView.as_view(), name="list_coins"),
    path("api/trnsactions/", TransactionsView.as_view(), name="list_transactions"),
    path('portfolios/', PortfolioView.as_view(), name='list-portfolios'),
    path('portfolio/<int:id>/', views.portfolio_data, name='portfolio-data'),
    path('portfolio-history/<int:portfolio_id>/', PortfolioHistoryView.as_view(), name='portfolio-history-detail'),
    path('api/add-transaction/', views.add_transaction, name='add-transaction'),
    path("token/", CustomObtainAuthTokenView.as_view(), name="token"),
    path('api/add-portfolios/', views.create_portfolio, name='create-portfolio'),
    
]

urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]

