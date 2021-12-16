from django.urls import path
from . import views

app_name = 'mapfarm'

urlpatterns = [
	path('farm-map/<int:pk>', views.map, name="farm-map"),
	path('save-shape/<int:pk>', views.savePolygon, name="save-shape"),
	path('farm-dashboard/<int:pk>', views.showDashboard, name="farm-dashboard"),
	]
