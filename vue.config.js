module.exports = {
  publicPath: '/',
  configureWebpack: {
    externals: {
      'element-ui': 'ELEMENT',
      vue: 'Vue',
      echarts: 'echarts'
    }
  }
}
