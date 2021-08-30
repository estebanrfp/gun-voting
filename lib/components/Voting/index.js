import { gun } from '../../Gun'
import CD from '../Countdown'

import './styles.css'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const votingContainer = document.querySelector('.votingContainer')
const winningContainer = document.querySelector('.winningContainer')

const pubKey = urlParams.has('id') ? Array(urlParams.getAll('id')[0].split(','))[0] : null // alert('none')

function Vot (proposals) {
  const winningProposals = proposals.slice()
  let buttons
  let over = false

  function displayVotes () {
    if (over === true) {
      return
    }

    const html = proposals.map(proposal => `<div class="singleProposal vote${ proposal.votes } vote">
      <div class="title">${ proposal.title }</div>
      <div class="title">${ proposal.desc }</div>
      <div class="votes">${ proposal.votes }</div>
      <button>Vote</button>
    </div>
  `).join('')

    document.querySelector('.timer').style.display = 'none'
    winningContainer.innerHTML = 'Voting !'
    votingContainer.innerHTML = html

    buttons = document.querySelectorAll('button')

    for (let x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener('click', sendVote.bind(null, x))
    }
  }

  function winningProposal () {
    if (over === true) {
      return
    }
    const title = winningProposals.sort((a, b) => {
      const aFirst = a.votes
      const bFirst = b.votes
      return aFirst < bFirst ? 1 : -1
    })

    winningContainer.innerHTML = `${ title[0].title } is winning the voting!`

    if (title[0].votes === title[1].votes) {
      winningContainer.innerHTML = 'The votes is tied!!!!'
    }
  }

  function wonProposal (title) {
    over = true
    document.querySelector('body').classList.add('done')

    winningContainer.innerHTML = `${ title } won. The voting is over.`

    const buttons = document.querySelectorAll('button')

    for (const button of buttons) {
      button.style.display = 'none'
    }

    const options = document.querySelectorAll('.vote')
    // // for (let x = options.length - 1; x >= 0; x--) {
    // //   options[x].width = '13px !important'
    // // }
    // // options[0].style.width = '100% !important'
    options[0].classList.add('won')
    // options[0].style. = '100%'
  }

  function sendVote (x) {
    if (localStorage.getItem(pubKey)) {
      alert('already voted!')
    } else {
      if (over === true) {
        return
      }
      for (let i = proposals.length - 1; i >= 0; i--) {
        const proposal = proposals[i]

        if (x === i) {
          proposal.votes++

          localStorage.setItem(pubKey, true)
          proposals.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
          displayVotes()
          // const currentVote = document.querySelector(`.votingContainer .singleProposal:nth-child(${ i + 1 })`)
          // currentVote.classList.add('vote')

          // if (proposal.votes === 5) {
          //   wonProposal(proposal.title)
          //   return
          // }
          winningProposal()
        }
      }
    }
    gun.get(`~${ pubKey }`).get('voting').put(JSON.stringify(proposals))
  }

  function end () {
    proposals.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    displayVotes()
    wonProposal(proposals[0].title)
    window.scrollTo(0, 0)
  }

  winningProposal()
  displayVotes()

  // const timer = document.querySelector('.timer').value || 'January 1, 20250 12:00 PM'
  // CD(timer, end)
  gun.get(`~${ pubKey }`).get('timer').once(timer => CD(timer || 'January 1, 20250 12:00 PM', end))
}

gun.get(`~${ pubKey }`).get('voting').on(data => Vot(JSON.parse(data)))

// gun.get('~null').get('voting').put(null)

export default Vot
