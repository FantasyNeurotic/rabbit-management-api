const RabbitmqApi = require("../index");

var api = new RabbitmqApi({
  username: "guest", // default: guest
  password: "guest", // default: guest
  hostname: "localhost:8080", // default: localhost:55672
  protocol: "http" // default: http
});

const test = async () => {
  const result = await api.getQueue("/", "radiotherapy.failure")
  const { data } = await api.getQueueDetail("/", "radiotherapy.failure", {"vhost":"/","name":"radiotherapy.failure","truncate":"50000","ackmode":"ack_requeue_true","encoding":"auto","count":10});
};

test();
