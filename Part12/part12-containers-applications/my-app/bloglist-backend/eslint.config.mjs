import globals from "globals";
import js from "@eslint/js";
import lodash, { rules } from "eslint-plugin-lodash";
export default [
	js.configs.recommended,

	// hightlight-line
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
			globals: {
				...globals.node,
			},
			ecmaVersion: "latest",
		},
		plugins: ["lodash"],
		extends: ["plugin:lodash/recommended"],
	},
];
