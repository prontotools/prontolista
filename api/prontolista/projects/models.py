from django.db import models

from django_extensions.db.models import TimeStampedModel


class Project(TimeStampedModel):
    name = models.CharField(max_length=300)
