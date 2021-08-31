import { gun } from '../../Gun'
import CD from '../Countdown'

import './styles.css'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const votingContainer = document.querySelector('.votingContainer')
const winningContainer = document.querySelector('.winningContainer')

winningContainer.innerHTML = 'Please VOTE !!!' ?? null

const pubKey = urlParams.has('id') ? Array(urlParams.getAll('id')[0].split(','))[0] : null // alert('none')

function Vot (proposals) {
  const winningProposals = proposals.slice()
  let buttons
  let over = false

  function displayVotes () {
    if (over) {
      return
    }

    const html = proposals.map(proposal => `<div class="singleProposal vote${ proposal.votes } vote">
      <div class="votes">${ proposal.votes }</div>
      <div class="title box1">${ proposal.title }</div>
      
      <div class="title box2">${ proposal.desc }</div>
      <button>Vote</button>
    </div>
  `).join('')

    document.querySelector('.timer').style.display = 'none'

    votingContainer.innerHTML = html

    buttons = document.querySelectorAll('button')

    for (let x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener('click', sendVote.bind(null, x))
    }

    if (localStorage.getItem(pubKey)) {
      for (const button of buttons) {
        button.style.display = 'none'
      }
    }
  }

  function extendTime () {
    gun.get(`~${ pubKey }`).get('timer').once(timer => {
      winningContainer.innerHTML = timer
      // CD('January 1, 20250 12:00 PM' || 'January 1, 20250 12:00 PM', end)
    })
  }

  function winningProposal () {
    const title = winningProposals.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    // const title = winningProposals.sort((a, b) => {
    //   const aFirst = a.votes
    //   const bFirst = b.votes
    //   return aFirst < bFirst ? 1 : -1
    // })

    window.scrollTo(0, 0)

    if (over) {
      document.querySelector('body').classList.add('done')
      if (title[0].votes !== 0) {
        winningContainer.innerHTML = `${ proposals[0].title } won. The voting is over.`
      } else {
        winningContainer.innerHTML = 'no one participated in the vote !.'
      }

      const options = document.querySelectorAll('.vote')
      // for (let x = options.length - 1; x >= 0; x--) {
      //   options[x].width = '13px !important'
      // }
      // // options[0].style.width = '100% !important'
      options[0].classList.add('won')
      // options[0].style. = '100%'
      if (title[0].votes !== 0 && title[0].votes === title[1].votes) {
        winningContainer.innerHTML = 'The votes is tied!!!!'
        extendTime()
      }
    } else {
      if (title[0].votes !== 0) {
        winningContainer.innerHTML = `${ title[0].title } is winning the voting!`
      }

      if (title[0].votes !== 0 && title[0].votes === title[1].votes) {
        winningContainer.innerHTML = 'The votes is tied!!!!'
      }

      // const options = Array.from(document.querySelectorAll('.votingContainer .vote'))
      // setTimeout(() => {
      //   // options[0].style.width = '100%'
      //   console.log(options)
      // }, 3000)

      // options.style.width = '80%'
    }
  }

  function sendVote (x) {
    if (over) {
      return
    }
    for (let i = proposals.length - 1; i >= 0; i--) {
      const proposal = proposals[i]

      if (x === i) {
        proposal.votes++

        localStorage.setItem(pubKey, true)

        proposals.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
        displayVotes()

        winningProposal()
      }
    }
    gun.get(`~${ pubKey }`).get('voting').put(JSON.stringify(proposals))
  }

  winningProposal()
  displayVotes()

  gun.get(`~${ pubKey }`).get('timer').once(timer => CD(timer || 'January 1, 20250 12:00 PM', () => {
    over = true
    winningProposal()
  }))
}

gun.get(`~${ pubKey }`).get('voting').on(data => Vot(JSON.parse(data)))

// gun.get('~null').get('voting').put(null)

export default Vot
