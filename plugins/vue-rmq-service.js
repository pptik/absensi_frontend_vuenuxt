import mqtt from 'mqtt'
import config from '../middleware/RMQ/config_rmq'

let rmq = mqtt.connect(config.rmqAddress, {
  username: config.rmqUsername,
  password: config.rmqPassword,
  keepalive: 1,
  reconnectPeriod: 100 * 1
})

export default rmq
