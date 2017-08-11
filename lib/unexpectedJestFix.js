module.exports = (global, jestExpect) => {
    global.expect = (any, ...rest) => {
        if (rest.length !== 0) {
            throw new Error('Expect takes at most one argument.');
        }
        return jestExpect(any);
    };
};
