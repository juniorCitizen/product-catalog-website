const gentryLogo = require('@/assets/logo.png')

export default {
  namespaced: true,
  state: () => {
    return {
      companies: [],
      countries: [],
      certifications: [],
      staffs: [],
    }
  },
  getters: {
    getCompanyById: state => companyId => {
      if (!companyId)
        return {
          content: {
            name: 'Loading...',
            country: null,
            latitude: 0,
            longitude: 0,
            address: 'Loading...',
            email: 'Loading...',
            telephone: 'Loading...',
            fax: 'Loading...',
            certifications: [],
            staffs: [],
          },
        }
      const filterFn = company => company.id === companyId
      return state.companies.filter(filterFn)[0]
    },
    getCountryByUuid: state => countryUuid => {
      const name = 'Loading...'
      const flagUrl = gentryLogo
      if (!countryUuid) return {content: {name, flagUrl}}
      const filterFn = country => country.uuid === countryUuid
      return state.countries.filter(filterFn)[0]
    },
    getCertificationByUuid: state => uuid => {
      const name = 'Loading...'
      const logoUrl = gentryLogo
      if (!uuid) return {content: {name, logoUrl}}
      const filterFn = certification => certification.uuid === uuid
      return state.certifications.filter(filterFn)[0]
    },
    getStaffByUuid: state => uuid => {
      const name = 'Loading...'
      const email = 'Loading...'
      const mobile = 'Loading...'
      if (!uuid) return {content: {name, email, mobile}}
      const filterFn = staff => staff.uuid === uuid
      return state.staffs.filter(filterFn)[0]
    },
  },
  actions: {
    fetchAllCompanies({commit}) {
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'companies',
          per_page: 1000,
          sort_by: 'position:asc',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerCompanies', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllCountries({commit}) {
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'countries',
          per_page: 1000,
          sort_by: 'content.name:asc',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerCountries', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllCertifications({commit}) {
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'certifications',
          per_page: 1000,
          sort_by: 'position:asc',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerCertifications', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
    fetchAllStaffs({commit}) {
      const isDev = this.app.context.isDev
      return this.$storyapi
        .get('cdn/stories', {
          starts_with: 'staffs',
          per_page: 1000,
          sort_by: 'position:asc',
          version: isDev ? 'draft' : 'published',
        })
        .then(res => {
          commit('registerStaffs', res.data.stories)
          return Promise.resolve()
        })
        .catch(error => this.$nuxt.error(error))
    },
  },
  mutations: {
    registerCompanies(state, payload) {
      state.companies = payload
    },
    registerCountries(state, payload) {
      state.countries = payload
    },
    registerCertifications(state, payload) {
      state.certifications = payload
    },
    registerStaffs(state, payload) {
      state.staffs = payload
    },
  },
}
