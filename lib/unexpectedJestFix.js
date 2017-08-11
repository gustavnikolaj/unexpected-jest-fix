module.exports = (global, jestExpect) => {
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
