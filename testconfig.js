const mongoose = require('mongoose')
const cuid = require('cuid')
const connect = require('./exercises/connect')
const url = 'mongodb://localhost:27017/intro-mongodb-testing'

global.newId = () => {
  return mongoose.Types.ObjectId()
}
function clearDB() {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function () { })
  }
}
beforeEach(async done => {
  const db = cuid()
  if (mongoose.connection.readyState === 0) {
    try {
      await connect(url + db)
      clearDB()
      return done()
    } catch (e) {
      throw e
    }
  } else {
    clearDB()
    return done()
  }
})
afterEach(done => {
  clearDB()
  mongoose.disconnect()
  return done()
})

afterAll(done => {
  return done()
})
