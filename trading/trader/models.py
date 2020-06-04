from django.db import models

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=500, blank=True)
    balance = models.IntegerField()
    objects = models.Manager()

class Stocks(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    stocks_bought_number = models.IntegerField(null=False)
    bought_at_price = models.IntegerField(null=False)
    bought_at_time = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()

