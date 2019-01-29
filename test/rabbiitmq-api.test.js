const RabbitmqApi = require("../index");

var api = new RabbitmqApi({
  username: "guest", // default: guest
  password: "guest", // default: guest
  hostname: "localhost:8080", // default: localhost:55672
  protocol: "http" // default: http
});

const test = async () => {
  const { data } = await api.getQueue("/", "genOAR");
  console.log(data);
};

test();
