from django.contrib import admin

from .models import Comment, TestInstance


@admin.register(TestInstance)
class TestInstanceAdmin(admin.ModelAdmin):
    list_display = ("testcase", "testrun", "status")
    list_filter = ("assignees", "testrun")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("test_instance", "text")
    search_fields = ("text",)
