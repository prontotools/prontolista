from django.contrib import admin
from django.test import TestCase

from ..admin import CommentAdmin, TestInstanceAdmin
from ..models import Comment, TestInstance


class TestInstanceAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[TestInstance], TestInstanceAdmin)

    def test_admin_should_set_list_display(self):
        expected = ("testcase", "testrun", "status")

        assert TestInstanceAdmin.list_display == expected

    def test_admin_should_set_list_filter(self):
        expected = ("assignees", "testrun")

        assert TestInstanceAdmin.list_filter == expected


class CommentAdminTest(TestCase):
    def test_admin_should_be_registered(self):
        assert isinstance(admin.site._registry[Comment], CommentAdmin)

    def test_admin_should_set_list_display(self):
        expected = ("test_instance", "text")

        assert CommentAdmin.list_display == expected

    def test_admin_should_set_search_fields(self):
        expected = ("text",)

        assert CommentAdmin.search_fields == expected
