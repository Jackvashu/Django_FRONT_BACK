from django.urls import path
from . import views
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
urlpatterns = [
    path('',views.apiOverview, name='api-overview'),
    path('emp-list/',views.empList, name='emp-List'),
    path('emp-detail/<str:pk>/',views.empDetail, name='emp-detail'),
    path('emp-create/',views.empCreate, name='emp-create'),
    path('emp-update/<str:pk>/',views.empUpdate, name='emp-update'),
    path('emp-delete/<str:pk>/',views.empDelete, name='emp-delete'),
    # path('emp-search/<str:pk>',views.empSearch, name='emp-search'),
]



# http://127.0.0.1:8000/api/emp-list/       for emp list
# http://127.0.0.1:8000/api/emp-detail/<str:pk>/    only one detail
# http://127.0.0.1:8000/api/emp-create/             insert
# http://127.0.0.1:8000/api/emp-update/<str:pk>/    update
# http://127.0.0.1:8000/api/emp-delete/<str:pk>/    /delete
# 