import Gun from 'gun/gun'
import 'gun/sea'
import 'gun/axe'

import 'gun/lib/webrtc'
import 'gun/lib/bye'
import 'gun/lib/shim'
import 'gun/lib/radix'
import 'gun/lib/radisk'
// import 'gun/lib/store'
import 'gun/lib/rindexed'

const peers = [
  'http://localhost:8765/gun',
  'https://gun-manhattan.herokuapp.com/gun',
  'https://gun-ams1.maddiex.wtf:443/gun',
  'https://ovh.era.eco/gun'
]

const gun = Gun({
  peers,
  localStorage: false,
  radisk: true
})

const user = gun.user()

const SEA = Gun.SEA

export {
  gun,
  SEA,
  user
}
