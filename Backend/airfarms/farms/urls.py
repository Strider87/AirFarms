from django.contrib import admin
from django.urls import path, include
from . import views
from .views import FarmUpdateView, FarmListView, SubscriptionListView

urlpatterns = [
	path('', FarmListView.as_view(), name='farm'),
	path('farm/profile/', views.ViewFarmProfile, name='farm_profile'),
	path('farm/new/', views.create_farm, name='farm-create'),
	path('farm/<int:pk>/', views.post_detail_farm, name='farm-detail'),
	path('like/', views.like, name='farm-like'),
	path('farm/<int:pk>/update/', FarmUpdateView.as_view(), name='farm-update'),
	path('farm/<int:pk>/delete/', views.farm_delete, name='farm-delete'),
	path('farm/<int:pk>/follow/', views.FollowFarm, name='farm-follow'),
	path('search_farms/', views.search_farms, name='search_farms'),
	path('subscriptions/<str:farm>', SubscriptionListView.as_view(), name='subscriptions'),
]
