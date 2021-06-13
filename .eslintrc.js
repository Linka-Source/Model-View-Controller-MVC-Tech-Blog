module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
        commonjs: true,
        node: true,
        jest: true,
    },
    globals: {
        $: true,
    },
    plugins: ['prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        indent: ['warn', 4],
    },
};
