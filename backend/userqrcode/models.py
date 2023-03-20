from django.db import models


class User(models.Model):

    name = models.CharField(max_length=50,
                            null=False, blank=False)
    email = models.EmailField(
        unique=True,  null=False, blank=False)
    linkedin_url = models.URLField(null=False, blank=False)
    github_url = models.URLField(null=False, blank=False)
    about = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
