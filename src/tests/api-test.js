const UserClient = require('../client/user-client')
const DataFactory = require('../data/data-factory')
describe('Reqres API testing', function () {
    it('Retrieve the user details specific to a page', async function ({
        supertest,
        baseUrl,
    }) {
        const response = await UserClient.retreiveUserInAPageAndGetResponse(
            supertest,
            baseUrl,
            '2'
        )
        expect(response._body.page).to.eq(2)
    })

    it('Retrieve single user details ', async function ({ supertest, baseUrl }) {
        const response = await UserClient.retreiveSingleUserDetailsAndGetResponse(
            supertest,
            baseUrl,
            2
        )
        const { data, support } = response._body
        expect(data.id).to.eq(2)
        expect(data.email).to.eq('janet.weaver@reqres.in')
        expect(data.first_name).to.eq('Janet')
        expect(data.last_name).to.eq('Weaver')
        expect(support.url).to.eq('https://reqres.in/#support-heading')
    })

    it('Create a user', async function ({ supertest, baseUrl }) {
        const user = DataFactory.getUserDetails()
        await UserClient.createUserAndVerifyStatusCode(supertest, baseUrl, user)
    })

    it('Delete a user by ID', async function ({ supertest, baseUrl }) {
        await UserClient.deleteUserByIdAndVerifyStatusCode(supertest, baseUrl, '2')
    })

    it('Update a user details for a specific user id', async function ({
        supertest,
        baseUrl,
    }) {
        const user = DataFactory.getUserDetails()
        const response = await UserClient.updateUserDetailsAndGetResponse(
            supertest,
            baseUrl,
            '2',
            user
        )
        const { name, job } = response._body
        expect(name).to.eq(user.name)
        expect(job).to.eq(user.job)
    })
})
