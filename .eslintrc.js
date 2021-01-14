module.exports = {
  root: true,

  env: {
    node: true,
    mocha: true
  },

  plugins: ["mocha", "prettier"],

  extends: [
    "plugin:vue/essential",
    "plugin:mocha/recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue",
    "@vue/prettier"
  ],

  parserOptions: {
    parser: "babel-eslint"
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },

  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ]
};
