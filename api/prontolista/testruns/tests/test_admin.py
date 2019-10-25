from django.contrib import admin
from django.test import TestCase

from ..admin import TestRunAdmin
from ..models import TestRun


class TestRunAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[TestRun], TestRunAdmin)

    def test_admin_should_set_list_display(self):
        expected = ("id", "name", "project")

        assert TestRunAdmin.list_display == expected

    def test_admin_should_set_list_filter(self):
        expected = ("project__name",)

        assert TestRunAdmin.list_filter == expected

    def test_admin_should_set_search_fields(self):
        expected = ("name",)

        assert TestRunAdmin.search_fields == expected
