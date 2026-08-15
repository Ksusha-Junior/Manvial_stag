from pathlib import Path
import environ
import os
from datetime import timedelta

root = environ.Path(__file__) -2
env = environ.Env()
environ.Env.read_env(env.str(root(),'.env'))

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = env.str('SECRET_KEY')

DEBUG = env.bool('DEBUG', default=True)

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
# JWT_AUTH_COOKIE = "refresh_token"
# CSRF_COOKIE_SAMESITE = "None"
# CSRF_COOKIE_SECURE = True


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'main_bot',
    'general',
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    'users',
    # "channels",
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "django.middleware.common.CommonMiddleware",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}
# Настройка токенов

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,

    # Названия кук
    # 'AUTH_COOKIE': 'access_token',
    # 'AUTH_COOKIE_REFRESH': 'refresh_token',
    # 'AUTH_COOKIE_SECURE': False,  # Поменяйте на True на продакшене (HTTPS)
    # 'AUTH_COOKIE_HTTP_ONLY': True,  # JS не имеет доступа к кукам
    # 'AUTH_COOKIE_PATH': '/',
    # 'AUTH_COOKIE_SAMESITE': 'Lax',
}

# AUTH_USER_MODEL = 'users.CustomUser'

# DJOSER = {
#     'LOGIN_FIELD': 'email',
#     'USER_CREATE_PASSWORD_RETYPE': True, # Требовать подтверждение пароля
#     'SEND_ACTIVATION_EMAIL': True,       # Включить отправку писем для активации
#     'ACTIVATION_URL': 'activate/{uid}/{token}', # URL на вашем React-фронтенде
#     'SERIALIZERS': {
#         'user_create': 'users.serializers.CustomUserCreateSerializer',
#     },
# }

# Настройки SMTP-сервера (для отправки реальных писем, например через Yandex/Mail/Gmail)
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = '://yoursite.com'
# EMAIL_PORT = 465
# EMAIL_USE_SSL = True
# EMAIL_HOST_USER = 'noreply@yoursite.com'
# EMAIL_HOST_PASSWORD = 'your_email_password'


ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'
MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


