const router = require('express').Router()
const knex = require('../data/db')

router.get('/all', async (req, res) => {
    try {
        let data = await knex('books').where({ deleted: false }).select()
        res.json({status:1, data:data})
    } catch (error) {
        // console.log(error.message);
        res.json({status:0, message: error.message})
    }

})


router.get('/byId/:id', async (req, res) => {
    
    try {
        let data = await knex('books').where({ id: req.params.id }).select()
        if(data.length == 0) throw {message:'Data not found'}
        res.json({status:1, data:data[0]})
    } catch (error) {
        // console.log(error);
        res.json({status:0, message: error.message})
    }

})

router.post('/create', async (req, res) => {
    try {
        let {name, author, date_of_borrow, date_of_return, borrowed_by} = req.body
        let check
        check = await knex('books').where({ name, deleted: false }).select('id')
        if (check.length > 0) {
            throw {message:'Name already exist'}
        }
        await knex('books').insert({ name, author, date_of_borrow, date_of_return, borrowed_by, deleted: false })
        res.json({status:1, message:'success'})
    } catch (error) {
        res.json({status:0, message: error.message})

    }
})

router.put('/update/:id', async (req, res) => {

    try {
        let {name, author, date_of_borrow, date_of_return, borrowed_by} = req.body
        let check
        check = await knex('books').whereNot('id', req.params.id).andWhere({ name, deleted: false }).select('id')
        if (check.length > 0) {
            throw {message:'Name already exist'}
        }
        await knex('books').where({ id: req.params.id }).update({ name, author, date_of_borrow, date_of_return, borrowed_by })
        res.json({status:1, message:'success'})
    } catch (error) {
        res.json({status:0, message: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await knex('books').where({ id: req.params.id }).update({ deleted: true })
        res.json({status:1, message:'success'})
    } catch (error) {
        // console.log(error.message);
        res.json({status:0, message: error.message})
    }
})


module.exports = router