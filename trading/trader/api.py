from .models import CustomUser, Stocks
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, StockSerializer
# Lead Viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes= [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stocks.objects.all()
    permission_classes= [
        permissions.AllowAny
    ]
    serializer_class = StockSerializer