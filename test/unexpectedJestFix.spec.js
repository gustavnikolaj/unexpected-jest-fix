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

it('should export methods on expect', () => {
    const { expect: fixedExpect } = unexpectedJestFix({}, jestExpect);

    expect(Object.keys(fixedExpect), 'to equal', Object.keys(jestExpect));
});

it('should throw an error when installed into a already working expect', () => {
    const { expect: fixedExpect } = unexpectedJestFix({}, jestExpect);
    const consoleCalls = [];
    const mockConsole = { warn: (...args) => consoleCalls.push(args) };

    unexpectedJestFix({ console: mockConsole }, fixedExpect);

    expect(consoleCalls, 'to equal', [
        [
            'unexpected-jest-fix: You can uninstall this module now. ' +
                'Your Jest version already contains it.'
        ]
    ]);
});
