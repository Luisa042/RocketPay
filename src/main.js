import './css/index.css'
import IMask from 'imask'

const cardBgColor1 = document.querySelector(
  '.cc-bg svg > g g:nth-child(1) path'
)
const cardBgColor2 = document.querySelector(
  '.cc-bg svg > g g:nth-child(2) path'
)
const cardLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
  const colors = {
    default: ['black', 'gray'],
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#C69347', '#DF6F29'],
  }

  cardBgColor1.setAttribute('fill', colors[type][0])
  cardBgColor2.setAttribute('fill', colors[type][1])
  cardLogo.setAttribute('src', `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const securityCode = document.getElementById('security-code')
const securityCodePattern = {
  mask: '0000',
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.getElementById('expiration-date')
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 5).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
