
const supertest = require('supertest')
const assert = require('assert')
const app = require('./index')

describe('GET /',()=>{
    it('should return "Welcome to our REST API!"',async()=>{
        const res = await supertest(app).get('/');
        assert.equal(res.statusCode,200)
        assert.equal(res.text,'Welcome to our REST API!')
    })
})