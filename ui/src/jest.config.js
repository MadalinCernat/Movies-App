module.exports = {
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    
    // A map from regular expressions to module names or to arrays of module names
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.css$': '<rootDir>/src/components/styleMock.js'
    },

    testEnvironment: 'jsdom',
    
    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>/src'],
    
    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest/presets/js-with-ts',
    
    // A list of paths to snapshot serializer modules Jest should use for snapshot testing
    snapshotSerializers: ['jest-serializer-html'],
    
    // A map from regular expressions to paths to transformers
    transform: {
      '^.+\\.js?$': 'babel-jest'
    }
    
  };
  