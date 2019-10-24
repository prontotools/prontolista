from django.contrib import admin

from .models import TestRun


@admin.register(TestRun)
class TestRunAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "project")
    list_filter = ("project__name",)
    search_fields = ("name",)
