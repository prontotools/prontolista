from django.conf import settings
from django.db import models

from django_extensions.db.models import TimeStampedModel

from testcases.models import TestCase
from testruns.models import TestRun


class TestInstance(TimeStampedModel):
    testcase = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    testrun = models.ForeignKey(TestRun, on_delete=models.CASCADE)
    assignees = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="test_instances"
    )
    STATUSES = (("passed", "Passed"), ("blocked", "Blocked"), ("failed", "Failed"))
    status = models.CharField(null=True, blank=True, max_length=300, choices=STATUSES)

    def __str__(self):
        return self.testcase.name


class Comment(TimeStampedModel):
    test_instance = models.ForeignKey(TestInstance, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True)
