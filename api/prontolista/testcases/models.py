from django.db import models

from django_extensions.db.models import TimeStampedModel

from projects.models import Project


class TestCase(TimeStampedModel):
    name = models.CharField(max_length=300)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
