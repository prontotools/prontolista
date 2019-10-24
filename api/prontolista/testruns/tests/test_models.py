from django.test import TestCase

from model_bakery import baker

from ..models import TestRun
from projects.models import Project


class TestRunTest(TestCase):
    def test_model_should_have_defined_fields(self):
        project = baker.make(Project)
        expected_name = "main nav should stick"
        actual = TestRun.objects.create(name=expected_name, project=project)

        assert actual.name == expected_name
        assert actual.project.name == project.name
        assert actual.created
        assert actual.modified
