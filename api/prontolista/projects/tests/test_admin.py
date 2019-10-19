from django.contrib import admin
from django.test import TestCase

from ..admin import ProjectAdmin
from ..models import Project


class ProjectAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[Project], ProjectAdmin)

    def test_admin_should_set_list_display(self):
        expected = (
            'name',
            'created',
            'modified',
        )
        assert ProjectAdmin.list_display == expected
