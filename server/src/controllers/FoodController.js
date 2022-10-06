const { Food } = require('../models')
module.exports = {
    // get all Food
    async index(req, res) {
        try {
            const Foods = await Food.findAll()
            res.send(Foods)
        } catch (err) {
            res.status(500).send({
                error: 'The Foods information was incorrect'
            })
        }
    },
    // create Food
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const Food = await Food.create(req.body)
            res.send(Food.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Food incorrect'
            })
        }
    },
    // edit Food, suspend, active
    async put(req, res) {
        try {
            await Food.update(req.body, {
                where: {
                    id: req.params.FoodId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Food incorrect'
            })
        }
    },
    
// delete Food
async remove(req, res) {
        try {
            const Food = await Food.findOne({
                where: {
                    id: req.params.FoodId
                }
            })
            if (!Food) {
                return res.status(403).send({
                    error: 'The Food information was incorrect'
                })
            }
            await Food.destroy()
            res.send(Food)
        } catch (err) {
            res.status(500).send({
                error: 'The Food information was incorrect'
            })
        }
    },
    // get Food by id
    async show(req, res) {
        try {
            const Food = await Food.findByPk(req.params.FoodId)
            res.send(Food)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The Food information was incorrect'
            })
        }
    }
}