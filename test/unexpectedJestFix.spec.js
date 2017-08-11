const jestExpect = global.expect;
const expect = require('unexpected');
const unexpectedJestFix = require('../lib/unexpectedJestFix');

it('should throw an error when passing more than two arguments', () => {
    const { expect: fixedExpect } = unexpectedJestFix({}, jestExpect);

    return expect(
        () => {
            fixedExpect('foo', 'bar');
        },
        'to throw',
        'Expect takes at most one argument.'
    );
});
