import os

from .base import *


DEBUG = False


ALLOWED_HOSTS = ["*"]


STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")


STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)
