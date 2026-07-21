from django import forms
from .models import Message


class ContactForm(forms.ModelForm):
    def clean_message(self):
        message = self.cleaned_data['message']
        if Message.objects.filter(message=message).exists():
            raise forms.ValidationError('This message has already been sent.')
        return message

    class Meta:
        model = Message
        fields = ['name', 'email', 'message']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 6}),
        }
