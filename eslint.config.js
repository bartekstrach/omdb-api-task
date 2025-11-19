import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    // Global ignores
    {
        ignores: ['dist'],
    },
    // Base configs
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    // Your custom config
    {
        files: ['**/*.{js,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            import: importPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // React Hooks rules
            ...reactHooks.configs.recommended.rules,

            // React Refresh rules
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Enforce semicolons
            semi: ['error', 'always'],

            // Import sorting and grouping
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling'],
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
];
