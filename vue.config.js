module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/covid-19-map-app/'
    : '/'
}