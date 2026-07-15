from .settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# Fuso horário (BRT = UTC-3)
TIME_ZONE = 'America/Sao_Paulo'  # ou 'America/Sao_Paulo'
USE_TZ = True