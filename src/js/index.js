const api_url = 'https://travelbriefing.org/'
const theme_setup = {
  light: {
    primary: '#021b79',
    secondary: '#0575e6',
  }
}
const vuetify_opts = {
  theme: {
    themes: theme_setup,
  }
}

const vuetify = new Vuetify(vuetify_opts)

/*VUE INSTANCE*/
let vm = new Vue({
  vuetify,
  el: '#fr-container',
  data: {
    country_data_loading: false,
    country_selected: {
      name: ''
    },
    country_data: {},
    currency_selected: {
      name: "US Dollar",
      rate: "1"
    },
    rate_from: 1,
    rate_conversion: 1,
    countries: [],
  },

  computed: {
  },

  created() {
    this.initializeCountryList()
  },

  mounted() {
  },

  methods: {
    initializeCountryList() {
      app = this
      app.$http.get(api_url + 'countries.json').then(res => {
        app.countries = res.body
      })
    },
    getCountryInfo() {
      app = this
      if (typeof app.country_selected !== 'object') {
        return false
      }
      app.country_data_loading = true
      app.currency_selected = {
        name: "US Dollar",
        rate: "1"
      }
      app.$http.get(app.country_selected.url).then(res => {
        app.country_data = res.body
        app.country_data_loading = false
        app.rate_from = parseFloat(app.country_data.currency.rate)
      })
    },
    formatCurrentDate(timezone, format = 'LLLL') {
      return moment().tz(timezone).format(format)
    },
    makeConversionCurrency(conversion_type) {
      var origin_rate = parseFloat(app.country_data.currency.rate)
      var dollar_rate = parseFloat(app.currency_selected.rate)
      var rate_from = parseFloat(app.rate_from)
      var rate_conversion = parseFloat(app.rate_conversion)

      if (conversion_type == 'origin') {
        app.rate_conversion = parseFloat((rate_from/origin_rate)*dollar_rate).toFixed(2)
      } else {
        app.rate_from = parseFloat((rate_conversion/dollar_rate)*origin_rate).toFixed(2)
      }
    },
  }
});