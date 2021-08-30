import Layout from './components/Layout'
import './styles/styles.css'

if (navigator.serviceWorker) {
  navigator.serviceWorker.ready.then(registration => registration.update())
} else if (window.applicationCache) {
  window.applicationCache.update()
}

Layout()
