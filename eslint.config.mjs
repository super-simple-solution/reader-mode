import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "prettier", "plugin:@typescript-eslint/recommended"),
    {
        plugins: {
            prettier,
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.webextensions,
            },

            parser: parser,
            ecmaVersion: 2020,
            sourceType: "module",

            parserOptions: {
                parser: "@typescript-eslint/parser",

                ecmaFeatures: {
                    experimentalObjectRestSpread: true,
                },
            },
        },

        rules: {
            "prefer-rest-params": "off",
            "no-console": 0,
            "no-debugger": 0,
            quotes: [1, "single"],
            semi: [2, "never"],

            "prettier/prettier": ["error", {
                trailingComma: "all",
                tabWidth: 2,
                semi: false,
                singleQuote: true,
                bracketSpacing: true,
                eslintIntegration: true,
                printWidth: 120,
                endOfLine: "auto",
            }],

            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": ["error"],
            "@typescript-eslint/no-explicit-any": ["off"],

            "@typescript-eslint/no-empty-interface": ["error", {
                allowSingleExtends: false,
            }],
        },
    },
];