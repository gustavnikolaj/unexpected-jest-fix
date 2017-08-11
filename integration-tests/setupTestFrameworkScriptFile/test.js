/* global expect */

it('should complain if jestExpect is called with multiple arguments', () => {
    expect(() => expect('foo', 'bar')).toThrowError(
        new Error('Expect takes at most one argument.')
    );
});
