# Generated by Django 4.2.5 on 2023-10-31 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_coin_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="coin",
            name="id",
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]