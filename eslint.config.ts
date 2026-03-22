import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // 1. ESLint 官方推荐规则
  js.configs.recommended,

  // 2. 基础配置：Prettier 插件 + 浏览器环境
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { prettier: pluginPrettier },
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },

  // 3. TypeScript 推荐配置
  tseslint.configs.recommended,

  // 4. Vue 基础推荐配置
  pluginVue.configs['flat/essential'],

  // 5. Vue 文件特定规则
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser, // 解析 Vue 文件中的 <script>
      },
    },
    rules: {
      'no-console': 'warn',
      'vue/no-unused-vars': 'warn',
    },
  },

  // 6. 忽略文件
  {
    ignores: ['**/dist/**', '**/node_modules/**', '*.config.{js,ts}'],
  },
])
