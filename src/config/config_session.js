const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

let session_store = new MongoStore({ 
  url: `${process.env.DB_CONNECTION || 'mongodb'}://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'classified'}`,
  autoRemove: 'native'
})

let init_session = session({
  secret: process.env.SESSION_SECRET || "hiicat",
  resave: true,
  saveUninitialized: false,
  store: session_store,
  rolling: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
})

// for get session from socket io
let sessionMiddleware = init_session;

let config = (app) => {
  app.use(init_session)
}

module.exports = {
  config,
  session_store,
  sessionMiddleware
}