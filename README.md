# Toki — Simple Landing Site

Minimal Django site for a professional landing page with About + Contact pages.

Local quickstart

1. Create virtualenv and install:

   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt

2. Copy `.env.example` to `.env` and set `DJANGO_SECRET_KEY` and other env vars.

3. Run migrations and start server:

   python manage.py migrate
   python manage.py runserver

Deployment (Railway)

- Set environment variables on Railway (`DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`)
- Add `python -m pip install -r requirements.txt` and `python manage.py migrate` to the Railway setup steps
- Ensure the `Procfile` exists (already included)
- Run `python manage.py collectstatic --noinput` during deploy

Notes

- Static files are served with WhiteNoise for simplicity.
- **Place the provided birds image file at** `landing/static/landing/images/birds.png` (replace the placeholder file created by the scaffold).
- Contact form saves messages to DB and attempts to send email if SMTP vars are provided.

Railway quick steps

1. Set the environment variables in Railway (`DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`)
2. Set the build command: `pip install -r requirements.txt`
3. Set the start command to use the `Procfile` (Railway autodetects `gunicorn` via `Procfile`), and add these migration hooks:
   - `python manage.py migrate`
   - `python manage.py collectstatic --noinput`

That's the simplest production setup for Railway; it's stable and keeps the site online with minimal maintenance.

