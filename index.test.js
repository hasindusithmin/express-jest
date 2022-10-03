
const supertest = require('supertest')
const assert = require('assert')
const {app,customers} = require('./index')
const {faker} = require('@faker-js/faker')

describe('GET /',()=>{
    it('should return "Welcome to our REST API!"',async()=>{
        const res = await supertest(app).get('/');
        assert.equal(res.statusCode,200)
        assert.equal(res.text,'Welcome to our REST API!')
    })
})

describe('GET /api/customer',()=>{
    it('should return all customers',async()=>{
        const res = await supertest(app).get('/api/customers')
        assert.equal(res.statusCode,200)
        assert.equal(res.body.length,customers.length)
        res.body.forEach((customer,index)=>{
            assert.equal(customer.id,customers[index].id)
            assert.equal(customer.name,customers[index].name)
        })
    })
})

describe('GET /api/customer/:id',()=>{
    it('should return a customer',async()=>{
        const id = 1;
        const res = await supertest(app).get(`/api/customers/${id}`)
        assert.equal(res.statusCode,200)
        assert.equal(res.body.id,1)
        assert.equal(res.body.name,'Gayan')
    })
})

describe('GET /api/customers/:id',()=>{
    it('should return a customer',async()=>{
        const id = 1;
        const res = await supertest(app).get(`/api/customers/${id}`)
        const data = customers.find(({id})=>id == 1)
        assert.equal(res.statusCode,200)
        assert.equal(data.name,res.body.name)
    })
})


describe('GET /api/customers/:id',()=>{
    it('should return 404 if not exists',async()=>{
        const id = 100
        const res = await supertest(app).get(`/api/customers/${id}`)
        assert.equal(res.statusCode,404)
    })
})

describe('POST /api/customer',()=>{
    it('should create a new customer',async()=>{
        const name = faker.name.fullName()
        const res = await supertest(app).post('/api/customers').send({name})
        assert.equal(res.statusCode,200)
        assert.equal(customers.pop().name,name)
    })
})

describe('POST /api/customer',()=>{
    it('should not create a new customer and return 400',async()=>{
        const nama = faker.name.fullName()
        const res = await supertest(app).post('/api/customers').send({nama})
        assert.equal(res.statusCode,400)
    })
})


describe('PUT /api/customers',()=>{
    it('should update a customer',async()=>{
        const id = 2;
        const name = faker.name.fullName()
        const res = await supertest(app).put(`/api/customers/${id}`).send({name})
        assert.equal(res.statusCode,200)
        const cust = customers.find(({id})=>id==res.body.id)
        assert.equal(cust.name,name)
    })
})

describe('PUT /api/customers',()=>{
    it('should return 404 if not exists',async()=>{
        const id = 100
        const name  = faker.name.fullName()
        const res = await supertest(app).put(`/api/customers/${id}`).send({name})
        assert.equal(res.statusCode,404)
    })
})


describe('PUT /api/customers', () => {
    it('should return 400 for invalid body',async()=>{
        const id = 1;
        const res = await supertest(app).put(`/api/customers/${id}`).send({nama:'demo'})
        assert.equal(res.statusCode,400)
    })
})


describe('DELETE /api/customers/:id', () => { 
    it('should delete a customer',async()=>{
        const id = 1;
        const res =await supertest(app).delete(`/api/customers/${id}`)
        assert.equal(res.statusCode,200)
    })
 })