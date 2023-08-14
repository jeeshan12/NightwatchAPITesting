class UserClient {
  constructor() {
    this.USER_CLIENT_ENDPOINT = '/api/users'
  }

  async retreiveUserInAPageAndGetResponse(supertest, baseuri, pageNumber) {
    return await supertest
      .request(baseuri)
      .get(this.USER_CLIENT_ENDPOINT)
      .query({
        page: pageNumber,
      })
      .expect(200)
      .then(function (response) {
        return response
      })
  }

  async retreiveSingleUserDetailsAndGetResponse(supertest, baseuri, userId) {
    return await supertest
      .request(baseuri)
      .get(`${this.USER_CLIENT_ENDPOINT}/${userId}`)
      .expect(200)
      .then(function (response) {
        return response
      })
  }

  async createUserAndVerifyStatusCode(supertest, baseuri, user) {
    return await supertest
      .request(baseuri)
      .post(this.USER_CLIENT_ENDPOINT)
      .send(JSON.stringify(user))
      .expect(201)
      .then(function (response) {
        return response
      })
  }

  async deleteUserByIdAndVerifyStatusCode(supertest, baseuri, userid) {
    await supertest
      .request(baseuri)
      .delete(`${this.USER_CLIENT_ENDPOINT}/${userid}`)
      .expect(204)
  }

  async updateUserDetailsAndGetResponse(supertest, baseuri, userid, user) {
    return await supertest
      .request(baseuri)
      .put(`${this.USER_CLIENT_ENDPOINT}/${userid}`)
      .send(user)
      .expect(200)
      .then(function (response) {
        return response
      })
  }
}

module.exports = new UserClient()
