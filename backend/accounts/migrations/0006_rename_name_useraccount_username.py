# Generated by Django 4.2.5 on 2023-11-04 15:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_remove_transaction_portfolio"),
    ]

    operations = [
        migrations.RenameField(
            model_name="useraccount", old_name="name", new_name="username",
        ),
    ]
