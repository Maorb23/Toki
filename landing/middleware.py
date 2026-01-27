# landing/middleware.py
class PrintExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            return self.get_response(request)
        except Exception:
            import traceback, sys
            traceback.print_exc(file=sys.stderr)
            raise

# landing/middleware.py
from django.http import HttpResponseBadRequest
from django.core.exceptions import DisallowedHost

class DebugHostMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            return self.get_response(request)
        except DisallowedHost:
            host = request.get_host()
            return HttpResponseBadRequest(f"DisallowedHost: {host}")
