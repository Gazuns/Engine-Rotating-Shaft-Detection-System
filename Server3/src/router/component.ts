import { SuccessModel, ErrorModel } from '../model/dataModel'
import Database from 'better-sqlite3'

export const handleComponentRouter = (req, res, db: Database.Database) => {

    const method = req.method
    const BASE_URL = '/api/component'

    const type = req.query.type

    if (method === 'GET' && req.path === `${BASE_URL}/query`) {
        if (!type || typeof(type) !== 'string') {
            console.log('Database operator: select component fail - type')
            return new ErrorModel('Error: type')
        }

        const sql = db.prepare('SELECT * FROM Components WHERE Type = ?')
        const res = sql.run(type)

        console.log('Database operator: select component')
        return new SuccessModel(res)
    }

    if (method === 'GET' && req.path === `${BASE_URL}/all`) {
        const sql = db.prepare('SELECT * FROM Components')
        const res = sql.all()

        console.log('Database operator: select component all')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/add`) {
        const name = req.query.name
        const num = Number(req.query.num)

        if (!type || typeof(type) !== 'string') {
            console.log('Database operator: insert component fail - type')
            return new ErrorModel('Error: type')
        } else if (!name || typeof(name) !== 'string') {
            console.log('Database operator: insert component fail - name')
            return new ErrorModel('Error: name')
        } else if (!num || typeof(num) !== 'number') {
            console.log('Database operator: insert component fail - num')
            return new ErrorModel('Error: num')
        }

        const sql = db.prepare('INSERT INTO Components VALUES (?, ?, ?)')
        const res = sql.run(type, name, num)

        console.log('Database operator: insert component')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/update`) {
        const name = req.query.name
        const num = Number(req.query.num)

        if (!type || typeof(type) !== 'string') {
            console.log('Database operator: update component fail - type')
            return new ErrorModel('Error: type')
        } else if (!name || typeof(name) !== 'string') {
            console.log('Database operator: update component fail - name')
            return new ErrorModel('Error: name')
        } else if (!num || typeof(num) !== 'number') {
            console.log('Database operator: update component fail - num')
            return new ErrorModel('Error: num')
        }

        const sql = db.prepare('UPDATE Components SET Name = ?, Number = ? WHERE Type = ?')
        const res = sql.run(name, num, type)

        console.log('Database operator: update component')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/delete`) {
        if (!type || typeof(type) !== 'string') {
            console.log('Database operator: delete component fail - type')
            return new ErrorModel('Error: type')
        } 

        const sql = db.prepare('DELETE FROM Components WHERE Type = ?')
        const res = sql.run(type)

        console.log('Database operator: delete component')
        return new SuccessModel(res)
    }
}