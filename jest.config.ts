const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/portal-shell',
    '<rootDir>/apps/dashboard',
    '<rootDir>/libs/authentication',
    '<rootDir>/apps/teams',
    '<rootDir>/libs/ui',
  ],
};
