from django.contrib import admin

from .models import TestInstance


@admin.register(TestInstance)
class TestInstanceAdmin(admin.ModelAdmin):
    list_display = ("id", "testcase", "assignee", "status")
    search_fields = ("assignee",)
