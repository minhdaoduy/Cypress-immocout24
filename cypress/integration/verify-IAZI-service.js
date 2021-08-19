import listAddress from '../fixtures/json/addresses.json'
let jsonData = []
let bodyData

describe('Search with street name', function () {
  before(() => {
    jsonData = listAddress
  })
  after(() => {
    cy.writeFile('./cypress/fixtures/json/addresses.json', jsonData)
  })
  for (let i = 0; i < listAddress.length; i++) {
    // for (let i = 8000; i < 9000; i++) {
    // for (let i = 9000; i < listAddress.length; i++) {
    if (listAddress[i].result === undefined) {


      it(
        'Number#' + i + ' search ' + listAddress[i].object_street,
        function () {
          cy.request('POST', 'https://rest-api-int-05.immoscout24.ch/v4/it/sellerlead/prepopulateLead', {
            zipCity: listAddress[i].object_zip + " " + listAddress[i].object_city,
            streetNumber: listAddress[i].object_street
          }).then(({ body }) => {
            cy.request(
              'https://rest-api-int-05.immoscout24.ch/v4/en/sellerlead/' +
              body.id
            ).then(({ body }) => {
              bodyData = body
              // cy.log(JSON.stringify(body))

            })
          })

        }
      )
      it("collect result", () => {
        let note = ''
        if (bodyData === undefined) note += 'There is no data'
        else {
          if (bodyData.length === 0) note += 'There is no data'
          else {
            if (bodyData.constructionYear === undefined || bodyData.constructionYear === '')
              note += 'constructionYear is empty.'
            if (bodyData.propertyCategory === undefined || bodyData.propertyCategory === '')
              note += '\npropertyCategory is empty.'
            if (bodyData.numberOfRoom === undefined || bodyData.numberOfRoom === '')
              note += '\nnumberOfRoom is empty.'
            if (bodyData.streetNumber === undefined || bodyData.streetNumber === '')
              note += '\nstreetNumber is empty.'
            if (bodyData.zipCity === undefined || bodyData.zipCity === '')
              note += '\nzipCity is empty.'

          }
          jsonData[i].response = bodyData
        }

        jsonData[i].note = note
        if (note === '') {
          jsonData[i].result = 'PASSED'
        } else {
          jsonData[i].result = 'FALSE'
        }
      })
    }
  }
})
