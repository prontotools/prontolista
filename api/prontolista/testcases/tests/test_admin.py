from django.contrib import admin
from django.test import TestCase

from ..admin import TestCaseAdmin
from ..models import TestCase as TestCaseModel


class TestCaseAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[TestCaseModel], TestCaseAdmin)

    def test_admin_should_set_list_display(self):
        expected = ("id", "name", "project")

        assert TestCaseAdmin.list_display == expected

    def test_admin_should_set_list_filter(self):
        expected = ("project__name",)

        assert TestCaseAdmin.list_filter == expected

    def test_admin_should_set_search_fields(self):
        expected = ("name",)

        assert TestCaseAdmin.search_fields == expected
