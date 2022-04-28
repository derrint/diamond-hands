import _ from 'lodash'

function generateDate(date) {
  if(!date) return date
  
  const listMonth = [
    '',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  let splitDate = date.split('-')

  let day = splitDate[2]
  let month = listMonth[Number(splitDate[1])]
  let year = splitDate[0]

  return `${day} ${month} ${year}`
  
}

function getLastCharacter(str) {
  let result = str.slice(-3)

  return result
}

export default {
  generateDate,
  getLastCharacter
}