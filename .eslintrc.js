module.exports = {
    //使用支持ts的解析器
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        // 'prettier', //解决prettier和eslint的冲突
        'plugin:prettier/recommended', // 解决prettier和eslint的冲突
    ],

    //自定义规则
    rules: {
        eqeqeq: 2,
        'no-unused-vars': 'error',
    },
}
