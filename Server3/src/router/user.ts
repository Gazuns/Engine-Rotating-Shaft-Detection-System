import { SuccessModel, ErrorModel } from '../model/dataModel'
import Database from 'better-sqlite3'

export const handleUserRouter = (req, res, db: Database.Database) => {

    const method = req.method
    const BASE_URL = '/api/user'

    const id = Number(req.query.id)

    if (method === 'GET' && req.path === `${BASE_URL}/query`) {
        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: select user fail - id')
            return new ErrorModel('Error: id')
        }

        const sql = db.prepare('SELECT * FROM User WHERE ID = ?')
        const res = sql.run(id)

        console.log('Database operator: select user')
        return new SuccessModel(res)
    }

    if (method === 'GET' && req.path === `${BASE_URL}/all`) {
        const sql = db.prepare('SELECT * FROM User')
        const res = sql.all()

        console.log('Database operator: select user all')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/add`) {
        const name = req.query.name
        const auth = Number(req.query.auth)
        const password = req.query.password

        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: insert user fail - id')
            return new ErrorModel('Error: id')
        } else if (!name || typeof(name) !== 'string') {
            console.log('Database operator: insert user fail - name')
            return new ErrorModel('Error: name')
        } else if ((auth !== 0 && auth !== 1) || typeof(auth) !== 'number') {
            console.log('Database operator: insert user fail - auth')
            return new ErrorModel('Error: auth')
        }

        const sql = db.prepare('INSERT INTO User VALUES (?, ?, ?, ?)')
        const res = sql.run(id, name, auth, password)

        console.log('Database operator: insert user')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/update`) {
        const name = req.query.name
        const auth = Number(req.query.auth)
        const password = req.query.password

        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: update user fail - id')
            return new ErrorModel('Error: id')
        } else if (!name || typeof(name) !== 'string') {
            console.log('Database operator: update user fail - name')
            return new ErrorModel('Error: name')
        } else if ((auth !== 0 && auth !== 1) || typeof(auth) !== 'number') {
            console.log('Database operator: update user fail - auth')
            return new ErrorModel('Error: auth')
        }

        const sql = db.prepare('UPDATE User SET Name = ?, Authority = ?, Password = ? WHERE ID = ?')
        const res = sql.run(name, auth, password, id)

        console.log('Database operator: update user')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/delete`) {
        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: delete user fail - id')
            return new ErrorModel('Error: id')
        } 

        const sql = db.prepare('DELETE FROM User WHERE ID = ?')
        const res = sql.run(id)

        console.log('Database operator: delete user')
        return new SuccessModel(res)
    }
}