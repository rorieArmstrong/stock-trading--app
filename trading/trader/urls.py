from rest_framework import routers
from .api import UserViewSet, StockViewSet

router = routers.DefaultRouter()
router.register('stocks', StockViewSet, 'trader')
router.register('users', UserViewSet, 'trader')
urlpatterns = router.urls
