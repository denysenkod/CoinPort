# Generated by Django 4.2.5 on 2023-10-31 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_coin_portfolio_transaction"),
    ]

    operations = [
        migrations.AddField(
            model_name="coin",
            name="image",
            field=models.CharField(default="notProvided"),
            preserve_default=False,
        ),
    ]
