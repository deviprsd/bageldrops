"""bageldrops URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from core.views import UserTokenObtainPairView

from coupon import views as coupons
from product import views as products


router_v1 = routers.DefaultRouter()
router_v1.register(r'coupons', coupons.CouponViewSet)
router_v1.register(r'products', products.ProductViewSet)

urlpatterns = [
    path('', include('core.urls')),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router_v1.urls)),
    path('api-auth/accounts/', include('accounts.urls')),
    path('api-auth/token/', UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/token/verify/', TokenVerifyView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
