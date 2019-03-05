from .base import *

STATIC_URL = '/static/'

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack.stats.frontend.json')
    }
}
