from django.contrib import admin

from .models import TestRun
from test_instances.models import TestInstance


class TestInstanceInline(admin.TabularInline):
    model = TestInstance


@admin.register(TestRun)
class TestRunAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "project")
    list_filter = ("project__name",)
    search_fields = ("name",)
    inlines = [TestInstanceInline]
