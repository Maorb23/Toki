# Image & Template Quick Reference

Purpose: concise guide describing where the two landing images live and how templates, static files, and CSS connect.

Files and locations:
1. `landing/templates/landing/base.html` — page shell (header and nav). Contains header brand markup with the small inline logo (`brand-logo`) and the favicon link.
2. `landing/templates/landing/index.html` — landing page content (hero section); contains the controlled hero image (`hero-logo`).
3. `landing/static/landing/images/` — image assets (e.g. `birds.png`, `favicon.ico`).
4. `landing/static/landing/css/styles.css` — styles for header, hero and the two image classes (`.brand-logo`, `.hero-logo`).

How images are referenced:
- Templates use the `{% static %}` tag to build URLs, for example: `<img src="{% static 'landing/images/birds.png' %}" class="brand-logo">`.
- In development (`DEBUG = True`) Django's `runserver` serves app static files directly. In production, `collectstatic` writes files to `STATIC_ROOT`.

Key CSS hooks (what to change):
1. `.brand-logo` — inline logo next to header link. Constrained to small sizes (example: 28px desktop / 22px mobile).
2. `.hero-logo` — hero graphic centered in the hero area. Constrained (example: 120px desktop / 36px mobile).
3. If an image balloons, search for global rules (for example, `img { max-width: 100% }`) or third-party CSS that overrides local rules.

Cache-busting & development tips:
- `base.html` uses a cache-busted CSS link (`styles.css?v={{ ts }}`) while developing so the browser sees changes.
- If CSS changes do not appear: hard-refresh (`Ctrl+Shift+R`) or open DevTools → Network → Disable cache and reload.
- Remove any tracked `staticfiles/` build directory to avoid serving stale collected assets.

Favicon:
- `base.html` links `landing/static/landing/images/favicon.ico`. Add a `favicon.ico` there to stop 404s. Convert `birds.png` to a 64×64 `.ico` for production if desired.

Troubleshooting checklist:
1. Open DevTools → Elements and inspect the offending `<img>`; check Computed Styles and which rule sets width.
2. Search templates for extra `<img>` occurrences — there should be exactly two image tags in templates: `brand-logo` and `hero-logo`.
3. If a large image persists, confirm `index.html` does not include a duplicate hero image and that no other CSS overrides apply.

Quick edits:
- Change header logo size: edit `.brand-logo` in `landing/static/landing/css/styles.css`.
- Remove hero graphic: delete the `<img class="hero-logo">` line from `landing/templates/landing/index.html`.

Next steps I can take:
- Adjust spacing/size or add responsive breakpoints — tell me desired pixel sizes and I'll update `styles.css`.
