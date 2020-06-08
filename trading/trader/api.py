from .models import CustomUser, Stocks
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, StockSerializer
from django.http import Http404
# Lead Viewset
class UserViewSet(viewsets.ModelViewSet):
    # queryset = CustomUser.objects.all()
    permission_classes= [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return CustomUser.objects.filter(username=user)

class StockViewSet(viewsets.ModelViewSet):
    #queryset = Stocks.objects.all()
    permission_classes= [
        permissions.AllowAny
    ]
    serializer_class = StockSerializer
    def get_queryset(self):
        user = self.kwargs['user']
        return Stocks.objects.filter(userID=user)