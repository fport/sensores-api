const request = require('supertest')

const app = require('../app')

describe('App Test', () => {
  it('POST /api --> SUCCESSFUL REQ Json Format Response', () => {
    return request(app)
      .post('/api')
      .send({
        a: 'a',
        a: 'a'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            a: expect.any(Boolean),
            a: expect.any(Boolean),
            a: expect.any(String),
            a: expect.any(String),
            a: expect.anything()
          })
        )
      })
  })
  it('GET /api --> SUCCESSFUL REQ Json Format Response', () => {
    return request(app)
      .post('/api')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            a: expect.any(Boolean),
            a: expect.any(String),
            a: expect.anything(),
            a: expect.anything()
          })
        )
      })
  })
})
