const { Pool } = require('pg')
const postgress = require('../config/postgress')
const indexController = {}

const pool = new Pool(postgress)

indexController.ping = (req, res) => {
    res.json({
        success: true, 
    })
}

indexController.getUsers = async(req, res) => {
    const result = await pool.query('SELECT * FROM users')
    console.log(result.rows)
    res.status(200).json({
        success: true, 
        data: result.rows
    }) 
}

indexController.getUserById = async(req, res) => {
    const {id} = req.params

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    res.status(200).json({
        success: true, 
        data: result.rows
    })
}

indexController.createUser = async(req, res) => {
    const {name, email} = req.body

    const result = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, [name, email])
    
    console.log(result)

    res.status(200).json({
        success: true, 
        message: "User Added Successfully", 
        data: {
            name, 
            email
        }
    })
}

indexController.updateUser = async(req, res) => {
    const {id} = req.params
    const {name, email} = req.body

    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
            name, 
            email, 
            id
        ])

    res.status(200).json({
        success: true,  
        message: `User Updated Successfully`
    })
}


indexController.deleteUsers = async(req, res) => {
    const {id} = req.params

    const result = await pool.query('DELETE FROM users WHERE id = $1', [id])

    res.status(200).json({
        success: true, 
        data: `${result.rowCount} rows deleted`, 
        message: `User with id ${id} was deleted`
    })
}


module.exports = indexController