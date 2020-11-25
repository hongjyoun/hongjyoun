new Vue({
 el: '#vue-app',
 data: {
  name: '',
  age: '20',
  site: 'http://google.com'
 },
 methods: {
  greeting: (time) => {
    return `Good ${time}, ${this.name}`
  },
  readRef() {
    console.log(this.$refs)
  }
 }
})