const { faker } = require('@faker-js/faker')

class DataFactory {
  constructor() {}
  getUserDetails() {
    return {
      name: faker.person.fullName(),
      job: faker.person.jobTitle(),
    }
  }
}

module.exports = new DataFactory()
