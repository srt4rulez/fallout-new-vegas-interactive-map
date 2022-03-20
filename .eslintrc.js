module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        // 'jest/globals': true,
    },
    'settings': {
        // 'jest': {
        //     'version': '26.6.3'
        // },
        'react': {
            'createClass': 'createReactClass', // Regex for Component Factory to use, defaults to 'createReactClass'
            'pragma':   'React',  // Pragma to use, default to 'React'
            'fragment': 'Fragment',  // Fragment to use (may be a property of <pragma>), default to 'Fragment'
            'version':  'detect', // React version. 'detect' automatically picks the version you have installed.
        },
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        // 'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-redux/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'tsconfigRootDir': __dirname,
        'project': ['./tsconfig.json'],
    },
    'plugins': [
        'react',
        // 'jest',
        '@typescript-eslint',
        'react-redux',
    ],
    'overrides': [
        {
            'files': '**/*.d.ts',
            'rules': {
                'spaced-comment': 'off',
            },
        },
    ],
    'rules': {
        'indent': [
            'error',
            4,
            {
                'MemberExpression': 'off',
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            '1tbs'
        ],
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'func-call-spacing': [
            'error',
            'never'
        ],
        'key-spacing': [
            'error',
            {
                'mode': 'minimum'
            }
        ],
        'keyword-spacing': [
            'error'
        ],
        'lines-between-class-members': [
            'error'
        ],
        'new-parens': [
            'error'
        ],
        'no-lonely-if': [
            'error'
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1
            }
        ],
        'spaced-comment': [
            'error',
            'always'
        ],
        'semi-spacing': [
            'error'
        ],
        'space-unary-ops': [
            'error'
        ],
        'space-infix-ops': [
            'error'
        ],
        'space-in-parens': [
            'error'
        ],
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'space-before-blocks': [
            'error'
        ],
        'no-unneeded-ternary': [
            'error'
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'no-var': [
            'error'
        ],
        'id-length': [
            'error',
            {
                'exceptions': [
                    'i',
                    't'
                ]
            }
        ],
        'dot-notation': [
            'error'
        ],
        'curly': [
            'error'
        ],
        'jsx-quotes': [
            'error',
            'prefer-double',
        ],
        /**
         * react/* from eslint-plugin-react
         */
        'react/boolean-prop-naming': [
            'error',
            {
                // https://github.com/yannickcr/eslint-plugin-react/issues/1551
                'rule': '^(is|has)[A-Z]([A-Za-z0-9]?)+',
                'message': 'Prop ({{ propName }}) must be a isser or hasser. Eg: isAuthor, hasChildren',
            },
        ],
        'react/button-has-type': [
            'error',
        ],
        'react/default-props-match-prop-types': [
            'error',
        ],
        'react/no-access-state-in-setstate': [
            'error',
        ],
        'react/no-array-index-key': [
            'error',
        ],
        'react/no-children-prop': [
            'error',
        ],
        'react/no-danger': [
            'error',
        ],
        'react/no-danger-with-children': [
            'error',
        ],
        'react/no-deprecated': [
            'error',
        ],
        'react/no-did-mount-set-state': [
            'error',
        ],
        'react/no-did-update-set-state': [
            'error',
        ],
        'react/no-direct-mutation-state': [
            'error',
        ],
        'react/no-find-dom-node': [
            'error',
        ],
        'react/no-is-mounted': [
            'error',
        ],
        'react/no-multi-comp': [
            'error',
        ],
        'react/no-redundant-should-component-update': [
            'error',
        ],
        'react/no-render-return-value': [
            'error',
        ],
        'react/no-typos': [
            'error',
        ],
        'react/no-string-refs': [
            'error',
        ],
        'react/no-this-in-sfc': [
            'error',
        ],
        'react/no-unescaped-entities': [
            'error',
        ],
        'react/no-unknown-property': [
            'error',
        ],
        'react/no-unsafe': [
            'error',
        ],
        'react/no-unused-prop-types': [
            'error',
        ],
        'react/no-unused-state': [
            'error',
        ],
        'react/no-will-update-set-state': [
            'error',
        ],
        'react/prefer-es6-class': [
            'error',
        ],
        'react/prefer-stateless-function': [
            'error',
        ],
        'react/prop-types': [
            'error',
        ],
        'react/react-in-jsx-scope': [
            'error',
        ],
        'react/require-render-return': [
            'error',
        ],
        'react/self-closing-comp': [
            'error',
        ],
        'react/style-prop-object': [
            'error',
        ],
        'react/void-dom-elements-no-children': [
            'error',
        ],

        /**
         * react/jsx-* from eslint-plugin-react
         */
        'react/jsx-child-element-spacing': [
            'error',
        ],
        'react/jsx-closing-bracket-location': [
            'error',
            {
                'nonEmpty': 'line-aligned',
                'selfClosing': 'line-aligned',
            },
        ],
        'react/jsx-closing-tag-location': [
            'error',
        ],
        'react/jsx-curly-spacing': [
            'error',
        ],
        'react/jsx-equals-spacing': [
            'error',
        ],
        'react/jsx-first-prop-new-line': [
            'error',
            'multiline',
        ],
        'react/jsx-handler-names': [
            'error',
        ],
        'react/jsx-indent': [
            'error',
        ],
        'react/jsx-indent-props': [
            'error',
        ],
        'react/jsx-key': [
            'error',
        ],
        'react/jsx-max-props-per-line': [
            'error',
            {
                'maximum': 1,
                'when': 'multiline',
            },
        ],
        'react/jsx-no-comment-textnodes': [
            'error',
        ],
        'react/jsx-no-duplicate-props': [
            'error',
        ],
        // For translations/i18n
        // 'react/jsx-no-literals': [
        //     'error',
        // ],
        'react/jsx-no-target-blank': [
            'error',
        ],
        'react/jsx-no-undef': [
            'error',
        ],
        'react/jsx-fragments': [
            'error',
            'element',
        ],
        'react/jsx-pascal-case': [
            'error',
        ],
        'react/jsx-props-no-multi-spaces': [
            'error',
        ],
        'react/jsx-tag-spacing': [
            'error',
            {
                'closingSlash': 'never',
                'beforeSelfClosing': 'always',
                'afterOpening': 'never',
                'beforeClosing': 'never',
            },
        ],
        'react/jsx-uses-react': [
            'error',
        ],
        'react/jsx-uses-vars': [
            'error',
        ],
        'react/jsx-wrap-multilines': [
            'error',
            {
                'declaration': 'parens-new-line',
                'assignment': 'parens-new-line',
                'return': 'parens-new-line',
                'arrow': 'parens-new-line',
                'condition': 'parens-new-line',
                'logical': 'parens-new-line',
                'prop': 'parens-new-line',
            },
        ],
        '@typescript-eslint/array-type': [
            'error',
            {
                'default': 'generic',
            },
        ],
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
        ],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                'assertionStyle': 'as',
            },
        ],
        '@typescript-eslint/consistent-type-imports': [
            'error',
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
        ],
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
        ],
        '@typescript-eslint/type-annotation-spacing': [
            'error',
        ],
        '@typescript-eslint/consistent-indexed-object-style': [
            'error',
            'index-signature',
        ],
    }
};
