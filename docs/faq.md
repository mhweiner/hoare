# FAQ

## Why no built-in setup and teardown?

The use of setup() and teardown() or before() and after() methods in unit tests is often considered an anti-pattern [[1](https://jamesnewkirk.typepad.com/posts/2007/09/why-you-should-.html), [2](https://stackoverflow.com/questions/1087317/do-setup-teardown-hurt-test-maintainability), [3](https://medium.com/@jameskbride/testing-anti-patterns-b5ffc1612b8b)]. These methods are typically used to set up and tear down the test environment before and after each test case. While they may seem convenient at first, they can lead to several issues:

- Unit tests should be idempotent and non-destructive. They should not require a setup or teardown in the first place. If you're using one, it probably means you're running an integration test and doing stateful things, such as touching a database or changing a file on disk. (If you do intened to write an integration test, keep reading, we'll address this.)

- Hidden dependencies: When using setup() and teardown() methods, the dependencies between test cases are not explicit. This can make it difficult to understand and reason about the test suite as a whole. It becomes harder to identify which tests rely on specific setup steps and which tests may be affected by changes in the teardown process.

- Test pollution: setup() and teardown() methods can introduce test pollution, where changes made in one test case affect the outcome of subsequent test cases. This can lead to unreliable and unpredictable test results, making it harder to isolate and identify the root cause of failures.

- Complexity and maintenance: As the test suite grows, the complexity of managing the setup and teardown methods increases. It becomes harder to ensure that the test environment is properly set up and cleaned up for each test case. This can result in fragile tests that are difficult to maintain and modify.

Instead of using setup() and teardown() or before() and after() methods, it is recommended to follow the principles of Arrange-Act-Assert (AAA) in unit testing. Each test case should explicitly set up the necessary preconditions, perform the actions being tested, and assert the expected outcomes. This approach makes the dependencies between test cases explicit and promotes better test isolation and maintainability.

By avoiding the use of setup() and teardown() or before() and after() methods, you can write more focused and reliable unit tests that are easier to understand, maintain, and debug.

If you still need a re-useable function, such as for your integration tests, you can of course just write your own. It's just a function, after all! Why should a framework provide that?

```
function setup() {
  // do your dirty deeds
}
function teardown() {
  // do your dirty deeds
}
```