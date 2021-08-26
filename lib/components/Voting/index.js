
import './styles.css'

const proposals = [
  {
    title: 'Proposal 1',
    desc: 'Description 1',
    votes: 0
  },
  {
    title: 'Proposal 1',
    desc: 'Description 2',
    votes: 0
  },
  {
    title: 'Proposal 3',
    desc: 'Description 3',
    votes: 0
  },
  {
    title: 'Proposal 4',
    desc: 'Description 4',
    votes: 0
  },
  {
    title: 'Proposal 5',
    desc: 'Description 5',
    votes: 0
  }
]

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
  const first = winningProposals.sort(function (a, b) {
    const aFirst = a.votes
    const bFirst = b.votes
    return aFirst < bFirst ? 1 : -1
  })

  winningContainer.innerHTML = `${ first[0].first } is winning the voting!`

  if (first[0].votes === first[1].votes) {
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
  if (over === true) {
    return
  }
  for (let i = proposals.length - 1; i >= 0; i--) {
    const proposal = proposals[i]

    if (x === i) {
      proposal.votes++

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

export default displayVotes
