from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm


def index(request):
    return render(request, 'landing/index.html')


def about(request):
    return render(request, 'landing/about.html')


def contact(request):
    sent = False
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            msg = form.save()
            # attempt to send an email if an SMTP backend is configured
            try:
                send_mail(
                    subject=f"New contact from {msg.name}",
                    message=msg.message + f"\n\nFrom: {msg.name} <{msg.email}>",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.DEFAULT_FROM_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass
            return redirect('contact_thanks')
    else:
        form = ContactForm()
    return render(request, 'landing/contact.html', {'form': form})


def contact_thanks(request):
    return render(request, 'landing/contact_thanks.html')


def privacy(request):
    """Redirect to the externally-hosted privacy policy."""
    return redirect('https://www.privacypolicies.com/live/62bc86c1-f77d-4701-9b52-03a477afca0d')


def terms(request):
    """Redirect to the externally-hosted terms of service."""
    return redirect('https://www.privacypolicies.com/live/a825d9c0-2fdf-4261-8118-ac06231af9ca')
