module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        // project: ['./tsconfig.json'],
    },
    extends:  [
      'airbnb',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    "plugins": ["prettier", "eslint-plugin-tsdoc"],
    "ignorePatterns": ['.eslintrc.js', 'jest.config.js'],
    "rules": {
      "no-console": "off" ,
      'no-plusplus': 'off',
      'class-methods-use-this': ["error", { "exceptMethods": ["length"] }],
      "prettier/prettier": [ 
        "error",
        { "endOfLine":"auto" }
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
        }
     ],
     "tsdoc/syntax": "warn",
     "no-underscore-dangle": "off"
    },
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ['node_modules', 'src/'],
        }
      },
    }
  }