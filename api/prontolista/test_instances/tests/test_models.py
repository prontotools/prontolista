from django.contrib.auth.models import User
from django.test import TestCase

from model_bakery import baker

from ..models import Comment, TestInstance
from testcases.models import TestCase as TestCaseModel
from testruns.models import TestRun


class TestInstanceTest(TestCase):
    def setUp(self):
        self.testcase = baker.make(TestCaseModel)
        self.testrun = baker.make(TestRun)
        self.actual = TestInstance.objects.create(
            testcase=self.testcase, testrun=self.testrun, status="passed"
        )

    def test_model_should_have_defined_fields(self):
        user = baker.make(User)
        self.actual.assignees.add(user)

        assert self.actual.testcase.name == self.testcase.name
        assert self.actual.testrun.name == self.testrun.name
        assert self.actual.assignees.all().first() == user
        assert self.actual.status == "passed"
        assert self.actual.created
        assert self.actual.modified

    def test_model_should_have_string_representation(self):
        assert self.actual.__str__() == self.testcase.name


class CommentTest(TestCase):
    def test_model_should_have_defined_fields(self):
        expected_text = "This is a comment!"
        test_instance = baker.make(TestInstance)
        actual = Comment.objects.create(text=expected_text, test_instance=test_instance)

        assert actual.text == expected_text
        assert actual.test_instance.id == test_instance.id
        assert actual.created
        assert actual.modified
