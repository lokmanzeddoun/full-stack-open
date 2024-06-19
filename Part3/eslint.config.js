/** @type {import('eslint').Linter.FlatConfig[]} */

import globals from "globals"
import js from "@eslint/js"
import stylisticJs from "@stylistic/eslint-plugin-js"

export default [
	js.configs.recommended,
	{
		ignores: ["dist/**", "node_modules/**", "bin/**", "build/**"],
	},
	{
		plugins: {
			"@stylistic/js": stylisticJs,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				process: "readonly",
			},
			ecmaVersion: 2021,
			sourceType: "module",
		},
		files: ["**/*.js"],
		rules: {
			...js.configs.recommended.rules,
			"no-unused-vars": "warn",
			"@stylistic/js/linebreak-style": ["error", "unix"],
			"@stylistic/js/quotes": ["error", "double"],
			"@stylistic/js/semi": ["error", "never"],
		},
	},
]
