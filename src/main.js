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

const cardNumber = document.getElementById('card-number')
const cardNumberPattern = {
  mask: [
    {
      cardType: 'default',
      mask: '0000 0000 0000 0000',
    },
    {
      cardType: 'visa',
      regex: /^4\d{0,15}/,
      mask: '0000 0000 0000 0000',
    },
    {
      cardType: 'mastercard',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      mask: '0000 0000 0000 0000',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')

    const maskRegEx = dynamicMasked.compiledMasks.find((item) => {
      return number.match(item.regex)
    })

    return maskRegEx
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addCardButton = document.getElementById('add-card')
addCardButton.addEventListener('click', () => {
  alert('Cartão adicionado!')
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
})

const cardHolder = document.getElementById('card-holder')
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText =
    cardHolder.value.length === 0 ? 'FULANO DA SILVA' : cardHolder.value
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '123' : code
}

securityCodeMasked.on('accept', () =>
  updateSecurityCode(securityCodeMasked.value)
)

function updateCardNumber(cardNumber) {
  const ccNumber = document.querySelector('.cc-number')
  ccNumber.innerText =
    cardNumber.length === 0 ? '1234 5678 9012 3456' : cardNumber
}

cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector('.cc-expiration .value')
  ccExpiration.innerText = date.length === 0 ? '10/22' : date
}

expirationDateMasked.on('accept', () => updateExpirationDate(expirationDateMasked.value))