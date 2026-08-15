from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    # Проверяем, что email уникальный и заполнен
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    # Скрываем пароль при GET-ответах
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    # Переопределяем метод создания, чтобы захэшировать пароль
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
