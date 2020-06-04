from rest_framework import serializers
from .models import User, Stocks
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
#Stock Serializer
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = '__all__'