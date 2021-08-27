import './styles.css'

function Countdown (time) { // 'Dec 8, 2025 21:30:00' format
  // Set the date we're counting down to
  const countDownDate = new Date(time).getTime()

  // Update the count down every 1 second
  const x = setInterval(() => {
  // Get today's date and time
    const now = new Date().getTime()

    // Find the distance between now and the count down date
    const distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Output the result in an element with id="demo"
    const obj = document.querySelectorAll('.countdown')

    obj.forEach(function (el) {
      el.innerHTML = `<span class='days'>${ days }d</span><span class='hours'>${ hours }h</span><span class='minutes'>${ minutes }m</span><span class='seconds'>${ seconds }s</span>`
    })

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x)
      document.getElementById('demo').innerHTML = 'EXPIRED'
    }
  }, 1000)
}

export default Countdown
