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