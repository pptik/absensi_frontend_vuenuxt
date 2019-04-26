exports.publish = async (channel, data) => {
  let channelRMQ = await channel.createChannel()
  channelRMQ.publish('amq.direct', '*', new Buffer.Alloc(data), {})
}
