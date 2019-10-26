from django.contrib import admin

from .models import TestInstance


@admin.register(TestInstance)
class TestInstanceAdmin(admin.ModelAdmin):
    list_display = ("id", "testcase", "testrun", "assignee", "status")
    search_fields = ("assignee",)
    list_filter = ("testrun",)
