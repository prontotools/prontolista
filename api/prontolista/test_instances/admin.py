from django.contrib import admin

from .models import TestInstance


@admin.register(TestInstance)
class TestInstanceAdmin(admin.ModelAdmin):
    list_display = ("testcase", "testrun", "status")
    list_filter = ("assignees", "testrun")
