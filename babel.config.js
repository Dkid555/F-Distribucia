module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    'module:@react-native/babel-preset',
    // '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    "@babel/preset-flow"

  ],
  plugins: [
    // Include only if you are using Flow
    '@babel/plugin-transform-flow-strip-types',
    
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    
    // Add this if using Reanimated or similar
    'react-native-reanimated/plugin',
  ],
};