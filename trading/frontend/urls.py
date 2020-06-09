from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('graph', views.index),
    path('search', views.index)
]
