import { SuccessModel, ErrorModel } from '../model/dataModel'
import Database from 'better-sqlite3'

export const handleOrderRouter = (req, res, db: Database.Database) => {

    const method = req.method
    const BASE_URL = '/api/order'

    const id = Number(req.query.id)
    const dire = Number(req.query.dire)

    if (method === 'GET' && req.path === `${BASE_URL}/query`) {
        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: select order fail - id')
            return new ErrorModel('Error: id')
        } else if ((dire !== 0 && dire !== 1) || typeof(dire) !== 'number') {
            console.log('Database operator: select order fail - direction')
            return new ErrorModel('Error: direction')
        }

        const sql = db.prepare('SELECT * FROM Orders WHERE Type = ? AND Direction = ?')
        const res = sql.run(id, dire)

        console.log('Database operator: select order')
        return new SuccessModel(res)
    }

    if (method === 'GET' && req.path === `${BASE_URL}/all`) {
        const sql = db.prepare('SELECT * FROM Orders')
        const res = sql.all()

        console.log('Database operator: select order all')
        return new SuccessModel(res)
    }

    if (method === 'GET' && req.path === `${BASE_URL}/queryall`) {
        if ((dire !== 0 && dire !== 1) || typeof(dire) !== 'number') {
            console.log('Database operator: select order fail - direction')
            return new ErrorModel('Error: direction')
        }

        const sql = db.prepare('SELECT * FROM Orders WHERE Direction = ?')
        const res = sql.all(dire)

        console.log('Database operator: select order queryall')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/add`) {
        const buyer = req.query.buyer
        const type = req.query.type
        const num = Number(req.query.num)
        const createTime = Number(req.query.cTime)

        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: insert order fail - id')
            return new ErrorModel('Error: id')
        } else if (!buyer || typeof(buyer) !== 'string') {
            console.log('Database operator: insert order fail - name')
            return new ErrorModel('Error: name')
        } else if (!num || typeof(num) !== 'number') {
            console.log('Database operator: insert order fail - auth')
            return new ErrorModel('Error: num')
        } else if ((dire !== 0 && dire !== 1) || typeof(dire) !== 'number') {
            console.log('Database operator: insert order fail - direction')
            return new ErrorModel('Error: direction')
        } else if (!type || typeof(type) !== 'string') {
            console.log('Database operator: insert order fail - type')
            return new ErrorModel('Error: type')
        } else if (!createTime || typeof(createTime) !== 'number') {
            console.log('Database operator: insert order fail - createTime')
            return new ErrorModel('Error: createTime')
        }

        const sql = db.prepare('INSERT INTO Orders VALUES (?, ?, ?, ?, ?, ?)')
        const res = sql.run(id, buyer, type, num, dire, createTime)

        console.log('Database operator: insert order')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/update`) {
        const buyer = req.query.buyer
        const type = req.query.type
        const num = Number(req.query.num)
        const createTime = Number(req.query.cTime)

        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: update order fail - id')
            return new ErrorModel('Error: id')
        } else if (!buyer || typeof(buyer) !== 'string') {
            console.log('Database operator: update order fail - name')
            return new ErrorModel('Error: name')
        } else if (!num || typeof(num) !== 'number') {
            console.log('Database operator: update order fail - auth')
            return new ErrorModel('Error: num')
        } else if ((dire !== 0 && dire !== 1) || typeof(dire) !== 'number') {
            console.log('Database operator: update order fail - direction')
            return new ErrorModel('Error: direction')
        } else if (!type || typeof(type) !== 'string') {
            console.log('Database operator: update order fail - type')
            return new ErrorModel('Error: type')
        } else if (!createTime || typeof(createTime) !== 'number') {
            console.log('Database operator: update order fail - createTime')
            return new ErrorModel('Error: createTime')
        }

        const sql = db.prepare('UPDATE Orders SET Buyer = ?, ComponentsType = ?, Number = ?, Direction = ?, createTime = ? WHERE ID = ?')
        const res = sql.run(buyer, type, num, dire, createTime, id)

        console.log('Database operator: update order')
        return new SuccessModel(res)
    }

    if (method === 'POST' && req.path === `${BASE_URL}/delete`) {
        if (!id || typeof(id) !== 'number') {
            console.log('Database operator: delete order fail - id')
            return new ErrorModel('Error: id')
        } 

        const sql = db.prepare('DELETE FROM Orders WHERE ID = ?')
        const res = sql.run(id)

        console.log('Database operator: delete order')
        return new SuccessModel(res)
    }
}