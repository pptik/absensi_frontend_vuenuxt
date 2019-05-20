module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'A B S T E I N',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ABSTEIN adalah sebuah platform absensi berbasis web dan android application. Platform ini dapat diakses oleh siswa dan guru. Guru dapat melihat monitoring siswa yang tidak hadir dan jumlahnya sekaligus.' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/shortcut-icon.1.png' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#448aff' },
  /*
  ** Build configuration
  */
  css: [
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: '~/assets/theme.scss', lang: 'scss' } // include vue-material theme engine
  ],
  plugins: [
    { src: '~/plugins/vue-material' },
    { src: '~/plugins/vue-chart' },
    { src: '~/plugins/vue-alert'}
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['vue-material'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          query: {
            limit: 10000000, // 1KO
            name: 'img/[name].[hash:7].[ext]'
          }
        })
      }
    }
  }
}
