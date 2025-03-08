import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;

module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    "next",
    "eslint:recommended",
    "prettier",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["prettier", "react", "react-hooks"],
  rules: {
    // JavaScript rules
    "prefer-const": "warn",
    "no-var": "warn",
    "no-unused-vars": "warn",
    "object-shorthand": "warn",
    "quote-props": ["warn", "as-needed"],
    // React rules
    "react/jsx-fragments": ["warn", "syntax"], 
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: ["js", "jsx"],
      },
    ],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "prettier/prettier": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
