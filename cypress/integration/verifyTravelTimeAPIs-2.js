import listAddress from '../fixtures/json/addresses-result.json'
let jsonData = []

describe('Search with street name', function () {
  before(() => {
    jsonData = listAddress
  })
  after(() => {
    cy.writeFile('./cypress/fixtures/json/addresses-result.json', jsonData)
  })
  for (let i = 8990; i < listAddress.length; i++) {
    it(
      'Number#' + i + ' search ' + listAddress[i].object_street,
      function () {
        let note = ''
        let city = listAddress[i].object_city.toLowerCase()
        let street = listAddress[i].object_street.toLowerCase()
        city = city.replaceAll('saint', 'st')
        street = street.replaceAll('saint', 'st')

        city = city.replaceAll('route', 'rte')
        street = street.replaceAll('route', 'rte')

        street = street.replaceAll('chemin', 'ch.')
        street = street.replaceAll(',', '')
        street = street.replaceAll('.', '')
        street = street.replaceAll('  ', ' ')
        street = street.replaceAll('-', ' ')
        city = city.replaceAll('-', ' ')
        const keyword = listAddress[i].object_street.replaceAll(' ', '+')
        cy.request(
          'https://rest-api-int-05.immoscout24.ch/v4/en/sellerlead/poiautocomplete?term=' +
            keyword
        ).then(({ body }) => {
          if (body.length === 0) note += ' There is no any suggestion'
          else {
            let labelListString = ''
            for (let j = 0; j < body.length; j++) {
              let label = body[j].label.toLowerCase()
              city = city.toLowerCase()
              label = label.toLowerCase()

              label = label.replaceAll('saint', 'st')
              label = label.replaceAll('route', 'rte')
              label = label.replaceAll('chemin', 'ch.')
              label = label.replaceAll('  ', ' ')
              label = label.replaceAll('-', ' ')
              label = label.replaceAll('.', '')

              if (body[j].postCode === undefined || body[j].postCode === '')
                note += 'Suggestion#' + (j + 1) + ': Post code is empty.'

              if (
                (body[j].street === undefined || body[j].street === '') &&
                (body[j].houseNumber === undefined ||
                  body[j].houseNumber === '')
              )
                note +=
                  '\nSuggestion#' + (j + 1) + ': misses street information.'

              labelListString += ' ' + label
            }
            if (!labelListString.includes(listAddress[i].object_zip))
              note +=
                '\nThere is no suggestion which includes the expected post code'
            if (!labelListString.includes(city))
              note +=
                '\nThere is no suggestion which includes the expected city'
            if (!labelListString.includes(street))
              note +=
                '\nThere is no suggestion which includes the expected street'
          }
          jsonData[i].response = body
          jsonData[i].note = note
          if (note === '') {
            jsonData[i].result = 'PASSED'
          } else {
            jsonData[i].result = 'FALSE'
          }
        })
      }
    )
  }
})
