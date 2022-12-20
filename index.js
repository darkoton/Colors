let colorsWp = Array.from(document.querySelectorAll('.color'))
let letterColor = '0123456789ABCDEF'
let randColor
let randColors = []
let stringColor = ''
let colorLink

function initial() {
  if (window.location.hash.length > 1) {
    colorLink = window.location.hash.replace(/#/, '').split('-');

    for (let index = 0; index < colorLink.length; index++) {
      colorsWp[index].style.background = '#' + colorLink[index]
      colorsWp[index].querySelector('span').innerHTML = `#<label>${colorLink[index]}</label>`
    }
    return
  } else {
    updateColor()
  }
}

function updateColor() {
  window.location.href = '#'
  stringColor = ''
  randColors.length = 0

  colorsWp.forEach(element => {
    randColor = ''
    for (let index = 0; index < 6; index++) {
      randColor += letterColor[Math.floor(Math.random() * 16)]
    }
    if (!JSON.parse(element.getAttribute('lock'))) {
      randColors.push(randColor)
      element.querySelector('span').innerHTML = `#<label>${randColor}</label>`
      element.style.background = '#' + randColor
    } else {
      randColors.push(element.querySelector('label').textContent)
    }
  })

  stringColor = randColors.join('-')
  window.location.href += stringColor
}

document.addEventListener('keyup', () => {
  if (event.code == 'Space') {
    updateColor()
  }
})

function lock() {
  if (!JSON.parse(event.target.getAttribute('lock'))) {
    event.target.src = './img/lock.svg'
    event.target.setAttribute('lock', true)
    event.target.offsetParent.setAttribute('lock', true)
  } else {
    event.target.src = './img/lock-open.svg'
    event.target.setAttribute('lock', false)
    event.target.offsetParent.setAttribute('lock', false)
  }
}

function copy() {
  let target = event.target
  navigator.clipboard.writeText(event.target.offsetParent.querySelector("span").textContent)

  target.offsetParent.querySelector("p").classList.add('active')
  setTimeout(() => target.offsetParent.querySelector("p").classList.remove('active')
    , 1000)
}

initial()