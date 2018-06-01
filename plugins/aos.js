import AOS from 'aos'

export default ({app}) => {
  app.AOS = new AOS.init({
    duration: 60000,
    easing: 'ease-in-out-back',
  })
}
