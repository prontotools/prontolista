from django.test import TestCase

from model_bakery import baker

from ..models import TestInstance
from testcases.models import TestCase as TestCaseModel


class TestInstanceTest(TestCase):
    def test_model_should_have_defined_fields(self):
        testcase = baker.make(TestCaseModel)
        actual = TestInstance.objects.create(
            testcase=testcase, assignee="zkan", status="passed"
        )

        assert actual.testcase.name == testcase.name
        assert actual.assignee == "zkan"
        assert actual.status == "passed"
        assert actual.created
        assert actual.modified
