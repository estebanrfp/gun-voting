import { gun } from '../../Gun'
import spinner from '../Spinner'

export default () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  const pubKey = urlParams.has('id') ? Array(urlParams.getAll('id')[0].split(','))[0] : null // alert('none')

  spinner('show')

  gun.get(`~${ pubKey }`).get('voting').once(data => {
    data
      ? import('../Voting').then(module => module.default(data))
      : import('../Editor').then(module => module.default())

    spinner('hide')
  })
}
