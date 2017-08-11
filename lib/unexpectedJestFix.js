module.exports = (global, jestExpect) => {
    try {
        jestExpect('foo', 'bar');
    } catch (e) {
        if (e.message === 'Expect takes at most one argument.') {
            global.console.warn(
                'unexpected-jest-fix: You can uninstall this module now. ' +
                'Your Jest version already contains it.'
            );
        }
    }

    global.expect = (any, ...rest) => {
        if (rest.length !== 0) {
            throw new Error('Expect takes at most one argument.');
        }
        return jestExpect(any);
    };

    Object.keys(jestExpect).forEach(
        key => (global.expect[key] = jestExpect[key])
    );

    return global;
};
