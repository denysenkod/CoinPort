from django.contrib import admin

from .models import UserAccount, Portfolio, Coin, Transaction, PortfolioHistory

# Register your models here.

admin.site.register(UserAccount)
admin.site.register(Portfolio)
admin.site.register(Coin)
admin.site.register(Transaction)
admin.site.register(PortfolioHistory)
