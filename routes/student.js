const router = require('express').Router()
const knex = require('../data/db')

router.get('/all', async (req, res) => {
    try {
        let data = await knex('students').where({ deleted: false }).select()
        res.json({status:1, data:data})
    } catch (error) {
        // console.log(error.message);
        res.json({status:0, message: error.message})
    }

})


router.get('/byId/:id', async (req, res) => {
    
    try {
        let data = await knex('students').where({ id: req.params.id }).select()
        if(data.length == 0) throw {message:'Data not found'}
        res.json({status:1, data:data[0]})
    } catch (error) {
        // console.log(error);
        res.json({status:0, message: error.message})
    }

})

router.post('/create', async (req, res) => {
    try {
        let {first_name, last_name} = req.body
        let check
        check = await knex('students').where({ first_name, last_name, deleted: false }).select('id')
        if (check.length > 0) {
            throw {message:'Name already exist'}
        }
        await knex('students').insert({ first_name, last_name, deleted: false })
        res.json({status:1, message:'success'})
    } catch (error) {
        res.json({status:0, message: error.message})

    }
})

router.put('/update/:id', async (req, res) => {

    try {
        let {first_name, last_name} = req.body
        let check
        check = await knex('students').whereNot('id', req.params.id).andWhere({ first_name, last_name, deleted: false }).select('id')
        if (check.length > 0) {
            throw {message:'Name already exist'}
        }
        await knex('students').where({ id: req.params.id }).update({ first_name, last_name })
        res.json({status:1, message:'success'})
    } catch (error) {
        res.json({status:0, message: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await knex('students').where({ id: req.params.id }).update({ deleted: true })
        res.json({status:1, message:'success'})
    } catch (error) {
        // console.log(error.message);
        res.json({status:0, message: error.message})
    }
})


module.exports = router