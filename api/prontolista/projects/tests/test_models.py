from django.test import TestCase

from ..models import Project


class ProjectTest(TestCase):
    def test_project_should_have_name(self):
        expected_name = 'Pronto Lista'
        project = Project.objects.create(name=expected_name)

        assert project.name == expected_name
        assert project.created
        assert project.modified
