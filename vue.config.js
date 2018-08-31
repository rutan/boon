module.exports = {
  configureWebpack: {
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true
    }
  },
  pwa: {
    name: 'boon',
    themeColor: '#13eecd',
    msTileColor: '#13eecd',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'icon.png',
      maskIcon: 'icon.svg',
      msTileImage: 'icon.png'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cacheId: 'boon'
    }
  }
};
