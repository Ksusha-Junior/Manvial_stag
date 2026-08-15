from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.views import APIView
from .serializers import RegisterSerializer


# 1. Регистрация (простой POST запрос)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Вспомогательная функция, которая упаковывает токен в куку
def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,  # JS не имеет доступа к куке (защита от XSS)
        secure=False,  # Поставьте True в продакшене (работает только по HTTPS)
        samesite="Lax",  # Если не сработает на разных портах, временно поставьте None
        # если не будет работать кука, то заменить на
        # samesite="None",
        # secure=True,
        max_age=3600 * 24 * 7,  # 7 дней
    )


# 2. Кастомный Логин
class CustomLoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            refresh = response.data["refresh"]
            # Удаляем refresh из JSON ответа
            del response.data["refresh"]
            # Прячем его в куку
            set_refresh_cookie(response, refresh)
        return response


# 3. Кастомное Обновление токена
class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        # Достаем refresh_token из кук запроса, который прислал браузер
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token missing"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Подменяем данные запроса, так как SimpleJWT ожидает токен в body
        serializer = self.get_serializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        # Если включена ротация токенов, придет новый refresh — его тоже в куку
        if "refresh" in serializer.validated_data:
            new_refresh = serializer.validated_data["refresh"]
            del response.data["refresh"]
            set_refresh_cookie(response, new_refresh)

        return response

class CustomLogoutView(APIView):
    permission_classes = (AllowAny,) # Выйти можно без валидного токена

    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        # Стираем куку, выставляя max_age=0
        response.delete_cookie(
            key="refresh_token",
            path="/", # Убедитесь, что путь совпадает с тем, где кука создавалась
        )
        return response
