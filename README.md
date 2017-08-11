A proper fix is already landed for this in jest. It will go out with the next
version of jest, so this module is only a temporary solution. See more on the
[pull request](https://github.com/facebook/jest/pull/4237).

A very unlucky interaction between jest and unexpected was found by @sunesimonsen.

When using unexpected it's common to import it under the name expect. Consider this case:

```js
import expect from 'unexpected';

it('should be unexpected', () => {
  expect(true, 'to be false');
});
```

If a user by accident forgets to import unexpected, they will not immediately
notice, as the builtin expect in jest will ignore any further arguments passed
to it. Which will result in a passing test instead of the failure you would
expect.

Until jest is released in a version containing this fix, it is available here as
a module. It is less optimal, as it only works when you are aware of it, but at
least it can help make sure that you don't get burned at all, or at least one
time at most.

Install it with npm:

```
npm install unexpected-jest-fix
```

Configure jest to use the module as a `setupTestFrameworkScriptFile`, in your
`package.json`:

```json
{
    "name": "my-package",
    "jest": {
      "setupTestFrameworkScriptFile": "unexpected-jest-fix"
    }
}
```
