from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'created',
        'modified',
    )
    search_fields = (
        'name',
    )
