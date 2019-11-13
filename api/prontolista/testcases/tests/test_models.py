from django.test import TestCase

from model_bakery import baker

from ..models import TestCase as TestCaseModel
from projects.models import Project


class TestCaseModelTest(TestCase):
    def test_model_should_have_defined_fields(self):
        project = baker.make(Project)
        expected_name = "Breadcrumb : click breadcrumb link"
        expected_description = "This is a description!"
        actual = TestCaseModel.objects.create(
            name=expected_name, project=project, description=expected_description
        )

        assert actual.name == expected_name
        assert actual.project.name == project.name
        assert actual.description == expected_description
        assert actual.created
        assert actual.modified

    def test_model_should_get_name_as_string_representation(self):
        project = baker.make(Project)
        testcase_name = "Breadcrumb : click breadcrumb link"
        expected_name = f"{project.name}: {testcase_name}"
        actual = TestCaseModel.objects.create(name=testcase_name, project=project)

        assert actual.__str__() == expected_name
