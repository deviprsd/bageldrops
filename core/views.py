from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, 'core/fend.html')

@csrf_exempt
def socket(request):
    return redirect(request.get_raw_uri().replace(':8000/', ':4200/'), permanent=True)
