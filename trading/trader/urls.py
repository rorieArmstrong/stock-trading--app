from rest_framework import routers
from .api import UserViewSet, StockViewSet

router = routers.DefaultRouter()
router.register('api/stocks', StockViewSet, 'trader')
router.register('api/users', UserViewSet, 'trader')
urlpatterns = router.urls
