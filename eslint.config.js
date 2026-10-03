import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules', 'coverage', 'preview', 'extensions'] },
  ...tseslint.configs.strict,
);
