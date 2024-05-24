import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: ["functions/", ".wrangler"]
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  eslintConfigPrettier,
];