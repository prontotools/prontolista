from django.test import TestCase

from model_bakery import baker

from ..models import TestCase as TestCaseModel
from projects.models import Project


class TestCaseModelTest(TestCase):
    def test_model_should_have_name(self):
        project = baker.make(Project)
        expected_name = "Breadcrumb : click breadcrumb link"
        actual = TestCaseModel.objects.create(name=expected_name, project=project)

        assert actual.name == expected_name
        assert actual.created
        assert actual.modified

    def test_model_should_have_foreign_key_to_project(self):
        expected_project_name = "Gravity Form test"
        project = baker.make(Project, name=expected_project_name)
        actual = TestCaseModel.objects.create(name="breadcrumb test", project=project)

        assert actual.project.name == expected_project_name
        assert actual.created
        assert actual.modified

    def test_model_should_get_name_as_string_representation(self):
        project = baker.make(Project)
        test_case_name = "Breadcrumb : click breadcrumb link"
        expected_name = f"{project.name}: {test_case_name}"
        actual = TestCaseModel.objects.create(name=test_case_name, project=project)

        assert actual.__str__() == expected_name
