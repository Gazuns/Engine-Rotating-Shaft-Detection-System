import { handleUserRouter } from './router/user'
import { handleComponentRouter } from './router/component'
import { handleOrderRouter } from './router/order'
import querystring from 'querystring'
import Database from 'better-sqlite3'
import * as http from 'http';

// 基于promise处理post请求参数
const getPostData = (req: http.IncomingMessage) => {
    const promise = new Promise((resolve, reject) => {
        // 非post请求返回空数据
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // 非json数据返回空数据
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        // 监听data方法，处理post数据流
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        // 监听end方法，返回数据
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

// 服务器处理
export const serverHandle = (req, res: http.ServerResponse<http.IncomingMessage>) => {
    // 连接数据库
    const db = new Database('./DIYcomputer.db')

    // 返回格式json
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    // cors
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // 获取请求url
    const url = String(req.url)
    // 获取接口路径
    req.path = url.split('?')[0]

    // 解析query，获取get请求参数
    req.query = querystring.parse(url.split('?')[1])

    // 解析postData，获取post请求参数
    getPostData(req).then(postData => {
        req.body = postData

        // 用户路由处理，经处理模块返回数据
        const userData = handleUserRouter(req, res, db)
        if (userData) {
            res.end(JSON.stringify(userData))
            db.close()
            return
        }

        const componentData = handleComponentRouter(req, res, db)
        if (componentData) {
            res.end(JSON.stringify(componentData))
            db.close()
            return
        }

        const orderData = handleOrderRouter(req, res, db)
        if (orderData) {
            res.end(JSON.stringify(orderData))
            db.close
            return
        }

        // 没有匹配任何路由返回404
        res.writeHead(404, {'content-type': 'text/plain'})
        res.write('404 not found\n')
        res.end('404')
    })
}