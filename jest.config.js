module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/reactTests/__mocks__/fileMock.js',
    '^.+\\.svg$': '<rootDir>/reactTests/__mocks__/svg.js',
    '\\.(css|less)$': '<rootDir>/reactTests/__mocks__/styleMock.js',
  },
  setupFiles: ['<rootDir>/reactTests/setupFile.js'],
  testEnvironment: 'jsdom',
};