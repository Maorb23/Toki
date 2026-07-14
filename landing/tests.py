from django.test import TestCase
from django.urls import reverse

from .models import Message


class LandingPageTests(TestCase):
    def test_home_uses_current_brand_assets_and_product_copy(self):
        response = self.client.get(reverse("index"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "TOKI_symbol_final.png")
        self.assertContains(response, "full_demo_day_edited.mp4")
        self.assertContains(response, "Same message. Different people.")

    def test_supporting_pages_render(self):
        for url_name in ("about", "contact", "contact_thanks"):
            with self.subTest(url_name=url_name):
                self.assertEqual(self.client.get(reverse(url_name)).status_code, 200)

    def test_contact_form_saves_a_message(self):
        response = self.client.post(
            reverse("contact"),
            {"name": "Test User", "email": "test@example.com", "message": "Hello TOKI"},
        )

        self.assertRedirects(response, reverse("contact_thanks"))
        self.assertTrue(Message.objects.filter(email="test@example.com").exists())
