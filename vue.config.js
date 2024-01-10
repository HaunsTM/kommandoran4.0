const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/local/kommandoran/'
    : '/',
  transpileDependencies: [
    'vuetify',
  ],
});