const { spawn } = require('child_process');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const path = require('path');
const jestPath = require.resolve('jest/bin/jest.js');

const resolve = rel => path.resolve(__dirname, rel);

const bufferArrayToString = arr =>
    arr.map(item => item.toString('utf-8')).join('');

const runJest = dir =>
    new Promise((resolve, reject) => {
        const stderr = [];
        const stdout = [];

        try {
            const jest = spawn(jestPath, [], { cwd: dir });

            jest.stdout.on('data', data => stdout.push(data));
            jest.stderr.on('data', data => stderr.push(data));

            jest.on('close', code => {
                resolve({
                    code,
                    stderr: bufferArrayToString(stderr),
                    stdout: bufferArrayToString(stdout)
                });
            });
        } catch (e) {
            reject(e);
        }
    });

(async () => {
    let failureCount = 0;
    const folderList = await readdir(__dirname);
    const integrationTests = folderList.filter(name => !/\.js$/.test(name));

    for (const test of integrationTests) {
        const { code, stderr } = await runJest(resolve(test));

        if (code === 0) {
            console.log('PASSED: %s', test);
        } else {
            console.log('FAILED: %s', test);
            console.log(stderr);
            failureCount += 1;
        }
    }

    process.exit(failureCount);
})();
