from django.contrib.auth.models import User
from django.test import TestCase

from model_bakery import baker

from ..models import TestInstance
from testcases.models import TestCase as TestCaseModel
from testruns.models import TestRun


class TestInstanceTest(TestCase):
    def test_model_should_have_defined_fields(self):
        testcase = baker.make(TestCaseModel)
        testrun = baker.make(TestRun)
        actual = TestInstance.objects.create(
            testcase=testcase, testrun=testrun, status="passed"
        )
        user = baker.make(User)
        actual.assignees.add(user)

        assert actual.testcase.name == testcase.name
        assert actual.testrun.name == testrun.name
        assert actual.assignees.all().first() == user
        assert actual.status == "passed"
        assert actual.created
        assert actual.modified
