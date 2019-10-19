from django.contrib import admin
from django.test import TestCase

from ..admin import ProjectAdmin
from ..models import Project


class ProjectAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        self.assertIsInstance(
            admin.site._registry[Project],
            ProjectAdmin
        )
