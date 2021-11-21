module.exports = {
  presets: ['@babel/env', '@babel/preset-react'],
  plugins: ['@babel/plugin-syntax-jsx', ['@babel/plugin-transform-runtime', {
    regenerator: true
  }]]
};
