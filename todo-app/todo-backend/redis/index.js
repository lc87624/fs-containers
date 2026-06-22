const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let set
let get
let incr

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  set = redisIsDisabled
  get = redisIsDisabled
  incr = redisIsDisabled
} else {
  let client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  
  client.connect().then(() => {
    console.log('Connected to Redis')
  })
    
  get = (...args) => client.get(...args)
  set = (...args) => client.set(...args)
  incr = (...args) => client.incr(...args)
}

module.exports = {
  get,
  set,
  incr
}
