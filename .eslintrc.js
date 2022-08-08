module.exports = {
	//解析器
	parser: 'vue-eslint-parser', //vue文件解析

	parserOptions: {
		parser: '@typescript-eslint/parser', //typescript解析
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},

	plugins: ['vue', '@typescript-eslint'],

	extends: [
		'airbnb-base',
		'plugin:vue/vue3-recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier', //解决prettier和eslint的冲突
		'plugin:prettier/recommended', // 解决prettier和eslint的冲突
	],

	//要覆盖的规则
	rules: {},
};
