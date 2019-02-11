from .base import *

DEBUG = False

STATIC_URL = 'assets/'

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/bageldrops-frontend',
        'STATS_FILE': os.path.join(BASE_DIR, '../../webpack.stats.frontend.json')
    }
}