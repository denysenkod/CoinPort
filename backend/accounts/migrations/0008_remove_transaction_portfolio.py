# Generated by Django 4.2.5 on 2023-11-09 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0007_transaction_portfolio"),
    ]

    operations = [
        migrations.RemoveField(model_name="transaction", name="portfolio",),
    ]
