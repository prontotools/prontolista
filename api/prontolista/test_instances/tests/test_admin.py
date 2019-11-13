from django.contrib import admin
from django.test import TestCase

from ..admin import TestInstanceAdmin
from ..models import TestInstance


class TestInstanceAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[TestInstance], TestInstanceAdmin)

    def test_admin_should_set_list_display(self):
        expected = ("testcase", "testrun", "status")

        assert TestInstanceAdmin.list_display == expected

    def test_admin_should_set_list_filter(self):
        expected = ("assignees", "testrun")

        assert TestInstanceAdmin.list_filter == expected
