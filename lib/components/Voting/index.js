
import { gun } from '../../Gun'

import './styles.css'

const pubKey = 12345

// const proposalsData = [
//   {
//     title: 'Proposal 1',
//     desc: 'Description 1',
//     votes: 2
//   },
//   {
//     title: 'Proposal 1',
//     desc: 'Description 2',
//     votes: 0
//   },
//   {
//     title: 'Proposal 3',
//     desc: 'Description 3',
//     votes: 0
//   },
//   {
//     title: 'Proposal 4',
//     desc: 'Description 4',
//     votes: 0
//   },
//   {
//     title: 'Proposal 5',
//     desc: 'Description 5',
//     votes: 0
//   }
// ]

// gun.get(`~${ pubKey }`).get('proposals2').put(JSON.stringify(proposalsData))

function Vot (proposals) {
  const winningProposals = proposals.slice()
  let button
  let over = false

  const votingContainer = document.querySelector('.votingContainer')
  const winningContainer = document.querySelector('.winningContainer')

  function displayVotes () {
    if (over === true) {
      return
    }

    const html = proposals.map(proposal => `<div class="singleProposal vote${ proposal.votes }">
      <div class="title">${ proposal.title }</div>
      <div class="title">${ proposal.desc }</div>
      <div class="votes">${ proposal.votes }</div>
      <button>Vote</button>
    </div>
  `).join('')

    votingContainer.innerHTML = html

    button = document.querySelectorAll('button')

    for (let x = 0; x < button.length; x++) {
      button[x].addEventListener('click', sendVote.bind(null, x))
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

    for (let x = button.length - 1; x >= 0; x--) {
      button[x].removeEventListener('click', sendVote.bind(null, x))
    }
  }

  function sendVote (x) {
    if (localStorage.getItem('gun-voting-username') === null) {
      localStorage.setItem('gun-voting-username', `${ Math.random().toString(36).substr(2, 9) }false`)
    } else if (localStorage.getItem('gun-voting-username').includes('true')) {
      alert('already voted!')
    } else {
      if (over === true) {
        return
      }
      for (let i = proposals.length - 1; i >= 0; i--) {
        const proposal = proposals[i]

        if (x === i) {
          proposal.votes++

          localStorage.setItem('gun-voting-username', `${ localStorage.getItem('gun-voting-username').split('false')[0] }true`)
          console.log(localStorage.getItem('gun-voting-username'))

          displayVotes()
          // const currentVote = document.querySelector(`.votingContainer .singleProposal:nth-child(${ i + 1 })`)
          // currentVote.classList.add(`${ proposal.votes }`);

          if (proposal.votes === 5) {
            wonProposal(proposal.title)
            return
          }
          winningProposal()
        }
      }
    }
    gun.get(`~${ pubKey }`).get('proposals2').put(JSON.stringify(proposals))
  }
  displayVotes()
}

gun.get(`~${ pubKey }`).get('proposals2').on(data => Vot(JSON.parse(data)))

export default Vot