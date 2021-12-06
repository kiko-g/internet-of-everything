var mqtt = require('mqtt')

var options = {
    clientId: "node_server",
    clean: true
}
var client  = mqtt.connect('mqtt://localhost', options)

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
