"""
URL configuration for Map project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path
from rest_framework.routers import DefaultRouter

from comments.views import ComView
from objects.views import ObjView
from routes.views import RoutesView
from users.views import UserView
router = DefaultRouter()

router.register('users', UserView)
router.register('routes', RoutesView)
router.register('objects', ObjView)
router.register('comments', ComView)

urlpatterns = [
    path('admin/', admin.site.urls),

]
urlpatterns += router.urls
