# Generated by Django 4.2.5 on 2023-12-06 16:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0010_rename_portfolio_transaction_portfolioid"),
    ]

    operations = [
        migrations.CreateModel(
            name="PortfolioHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date_time", models.DateTimeField(auto_now_add=True)),
                ("total_value", models.DecimalField(decimal_places=8, max_digits=30)),
                (
                    "portfolio",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="accounts.portfolio",
                    ),
                ),
            ],
        ),
    ]
