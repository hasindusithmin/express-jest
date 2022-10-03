
const supertest = require('supertest')
const assert = require('assert')
const {app,customers} = require('./index')
const {faker} = require('@faker-js/faker')

// describe('GET /',()=>{
//     it('should return "Welcome to our REST API!"',async()=>{
//         const res = await supertest(app).get('/');
//         assert.equal(res.statusCode,200)
//         assert.equal(res.text,'Welcome to our REST API!')
//     })
// })

// describe('GET /api/customer',()=>{
//     it('should return all customers',async()=>{
//         const res = await supertest(app).get('/api/customers')
//         assert.equal(res.statusCode,200)
//         assert.equal(res.body.length,customers.length)
//         res.body.forEach((customer,index)=>{
//             assert.equal(customer.id,customers[index].id)
//             assert.equal(customer.name,customers[index].name)
//         })q
//     })
// })

// describe('GET /api/customer/:id',()=>{
//     it('should return a customer',async()=>{
//         const id = 1;
//         const res = await supertest(app).get(`/api/customers/${id}`)
//         assert.equal(res.statusCode,200)
//         assert.equal(res.body.id,1)
//         assert.equal(res.body.name,'Gayan')
//     })
// })

describe('POST /api/customer',()=>{
    it('should create a new customer',async()=>{
        const name = faker.name.fullName()
        const res = await supertest(app).post('/api/customers').send({name})
        assert.equal(res.statusCode,200)
        assert.equal(customers.pop().name,name)
    })
})