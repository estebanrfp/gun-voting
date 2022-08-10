import Gun from 'gun/gun'
import SEA from 'gun/sea'

import 'gun/axe'
import 'gun/lib/webrtc'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/rindexed'

const peers = [
  'http://localhost:8765/gun',
  'https://gunjs.herokuapp.com/gun'
]

const gun = Gun({
  peers,
  localStorage: false
})

const user = gun.user().recall({ sessionStorage: true })

export {
  gun,
  SEA,
  user
}
