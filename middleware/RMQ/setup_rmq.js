const rmq = require('amqplib')
const config = require('./config_rmq')

module.exports = {
  connectToRmq: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let rmqConn = await rmq.connect(config.rmq)
        resolve(rmqConn)
      } catch (error) {
        console.log('fail to connect ', error)
        reject(error)
      }
    })
  }
}
