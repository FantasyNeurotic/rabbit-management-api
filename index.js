const request = require("request");
const qs = require("qs");

class RabbitmqApi {
  constructor({hostname = "localhost:15672", username = "guest",  password = "guest", protocol = "http"} = {}) {
    this.hostname = hostname
    this.username = username
    this.password = password
    this.protocol = protocol
  }

  rpc(method, path, params = {}, body = {}) {
    return new Promise((resolve, reject) => {
      const url =  this.protocol + "://" + this.username + ":" + this.password + "@" + this.hostname + "/api/" + path + qs.stringify(params)
      request(
        {
          method: method,
          url,    
          form: JSON.stringify(body)
        },
        function(err, res, data) {
          if (err) {
            return reject(err);
          } else if (res.statusCode > 200) {
            reject(new Error("Status code: " + res.statusCode));
          } else if (data === "Not found.") {
            reject(new Error("Undefined."));
          } else {
            data = JSON.parse(data);
            resolve({ res, data });
          }
        }
      );
    });
  }
  overview() {
    return this.rpc("GET", "overview/");
  }

  extensions() {
    return this.rpc("GET", "definitions/");
  }

  definitions() {
    return this.rpc("GET", "definitions/");
  }

  getNode(name) {
    return this.rpc("GET", "nodes/" + encodeURIComponent(name) + "/");
  }

  nodes() {
    return this.rpc("GET", "nodes/");
  }

  queues() {
    return this.rpc("GET", "queues/");
  }

  getQueue(vhost, name) {
    return this.rpc(
      "GET",
      "queues/" +
        encodeURIComponent(vhost) +
        "/" +
        encodeURIComponent(name) +
        "/",
      {}
    );
  }

  getQueueDetail(vhost, name, body = { vhost: "/", name: "", truncate: 50000, ackmode: "ack_requeue_true",encoding: "auto",count: 1}) {
    return this.rpc(
      "POST",
      "queues/" +
        encodeURIComponent(vhost) +
        "/" +
        encodeURIComponent(name) +
        "/get",
        {},
        body
    );
  }


  alive(vhost) {
    return this.rpc(
      "GET",
      "aliveness-test/" + encodeURIComponent(vhost) + "/",
      {}
    );
  }
}

module.exports = RabbitmqApi;
