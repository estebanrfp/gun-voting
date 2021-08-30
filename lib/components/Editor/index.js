import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import './styles.css'
import { gun } from '../../Gun'

function Editor () {
  const winningContainer = document.querySelector('.winningContainer')
  const proposalsData = [
    {
      title: 'OVGRID - Open Virtual Grid using Gun !',
      desc: 'Proposal from @estebanrfp',
      votes: 0
    },
    {
      title: 'DECENTRALAND using IPFS',
      desc: 'Proposal from @decentraland',
      votes: 0
    },
    {
      title: 'FACEBOOK HORIZON using Photon',
      desc: 'Proposal from @Facebook',
      votes: 0
    },
    {
      title: 'I HATE VIRTUAL WORLDS',
      desc: 'Do not vote for this option !!!',
      votes: 0
    }
  ]

  function copyUrl (pubKey) {
    navigator.clipboard.writeText(pubKey).then(() => {
      winningContainer.innerHTML = 'link copied into clipboard! you can now share the url of the vote!'
      setTimeout(() => {
        winningContainer.innerHTML = 'Pleace vote !!!'
      }, 2000)
    }, () => {
      console.log('Copy permissions denied')
    })
  }

  winningContainer.innerHTML = 'Modify JSON and embed generated code !'

  document.querySelector('.votingContainer').innerHTML = `
  <textarea id="votingData" spellcheck="false">${ JSON.stringify(proposalsData, null, 1) }</textarea>
  <button id="generateUrl">GO</button>
  `
  document.querySelector('button#generateUrl').addEventListener('click', () => {
    const pubKey = Math.random().toString(36).substr(2, 9)
    const dat = document.querySelector('#votingData').value
    gun.get(`~${ pubKey }`).get('voting').put(dat)

    import('../Voting').then(module => module.default(JSON.parse(dat)))
    window.history.pushState({ id: pubKey }, '', `?id=${ pubKey }`)
    copyUrl(window.location.href)

    const timer = document.querySelector('.timer').value || 'January 1, 20250 12:00 PM'
    gun.get(`~${ pubKey }`).get('timer').put(timer)
  })

  flatpickr('.timer', {
    enableTime: true,
    mode: 'single',
    dateFormat: 'F j, Y h:i K'
  })
}

export default Editor
