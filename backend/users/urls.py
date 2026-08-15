from django.urls import path

from .views import CustomLoginView, CustomTokenRefreshView, RegisterView, CustomLogoutView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth_register"),
    path("auth/login/", CustomLoginView.as_view(), name="auth_login"),
    path("auth/refresh/", CustomTokenRefreshView.as_view(), name="auth_refresh"),
    path("auth/logout/", CustomLogoutView.as_view(), name="auth_logout"),
]
