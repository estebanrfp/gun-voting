import Gun from 'gun/gun'
import 'gun/lib/webrtc'
import 'gun/lib/bye'
import 'gun/sea'
import 'gun/lib/shim'
import 'gun/lib/radix'
import 'gun/lib/radisk'
// import 'gun/lib/store'
import 'gun/lib/rindexed'

const peers = [
  'http://localhost:8765/gun',
  'https://gun-manhattan.herokuapp.com/gun'
]

const gun = Gun({
  peers,
  localStorage: true,
  radisk: true
})

const user = gun.user()

const SEA = Gun.SEA

export {
  gun,
  SEA,
  user
}