from django.contrib import admin

from .models import TestCase


@admin.register(TestCase)
class TestCaseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "project")
    list_filter = ("project",)
    search_fields = ("name",)
