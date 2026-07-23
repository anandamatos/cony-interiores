import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "build", "coverage", "node_modules"],
  },

  js.configs.recommended,

  react.configs.flat.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off",

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
