from django.contrib import admin

from .models import TestCase


@admin.register(TestCase)
class TestCaseAdmin(admin.ModelAdmin):
    list_display = ("name", "project")
    list_filter = ("project__name",)
    search_fields = ("name",)
