from django.shortcuts import render
from django.conf import settings


def index(request):
    if settings.DEBUG:
        return render(request, 'core/frontend-dev.html')
    else:
        return render(request, 'core/frontend-prod.html')

# @csrf_exempt
# def socket(request):
#    return redirect(request.get_raw_uri().replace(':8000/', ':4200/'), permanent=False)
