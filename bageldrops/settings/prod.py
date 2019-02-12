from .base import *

DEBUG = False

ALLOWED_HOSTS += [
    "127.0.0.1"
]

STATIC_URL = '/assets/'
STATIC_ROOT = os.path.join(BASE_DIR, '../assets/')
STATICFILES_DIRS += [
    os.path.join(BASE_DIR, '../assets/bundles/bageldrops-frontend'),
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack.stats.frontend.json')
    }
}