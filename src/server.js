const app = require('express')()
const server = require('http').createServer(app)
const connect_DB = require('./config/connect_DB')
const bodyParser = require('body-parser')
const config_view_engine = require('./config/config_view_engine')
const init_router = require('./router/web')
const session = require('./config/config_session')

const HOST = process.env.APP_HOST || 'localhost';
const PORT = process.env.APP_PORT || 3001;

// connect database
connect_DB()

session.config(app)

config_view_engine(app)

// add body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

init_router(app)

server.listen(PORT, HOST, () => {
    console.log(`Run success at http://${HOST}:${PORT}`)
})