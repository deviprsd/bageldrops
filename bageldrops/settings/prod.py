from .base import *

DEBUG = True

ALLOWED_HOSTS += [
    "127.0.0.1"
]

STATIC_URL = 'assets/'

STATIC_ROOT = os.path.join(BASE_DIR, 'assets/')

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/bageldrops-frontend/',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack.stats.frontend.json')
    }
}