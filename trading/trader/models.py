from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    balance = models.DecimalField(max_digits=19, decimal_places=2, default=10000.00)
    # objects = models.Manager()

    def __str__(self):
        return self.username

class Stocks(models.Model):
    userID = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    stocks_bought_number = models.IntegerField(null=False)
    bought_at_price = models.DecimalField(max_digits=19, decimal_places=2, null=False)
    bought_at_time = models.DateTimeField(auto_now_add=True)
    # objects = models.Manager()

    def __str__(self):
        return self.userID