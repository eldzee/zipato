class Realm {

  constructor(cookie, bPath) {
    var request = require('request')
    this.bpath = (bPath == undefined) ? 'https://my.zipato.com' : bPath
    this.realmReq = request.defaults({
      'json': true,
      'jar': cookie
    })

  }

  run(name, callback) {
    let path = this.url(this.bpath + '/zipato-web/v2/realm/script/' + name)

    this.req(path, 'GET', null, function response(err, resp, body) {
      callback(err, resp, body)
    })
  }

  req(url, method, body, callback) {
    this.realmReq({
      url: url,
      method: method,
      body: body
    }, function (err, resp, body) {
      callback(err, resp, body)
    })
  }

  url() {
    let url = arguments[0]
    let query = arguments[1]
    if (query){
      if(Object.keys(query).length > 0) {
        url += "?"
        Object.keys(query).forEach(function(key) {
          url += key + "=" + query[key] + "&"
        })
        url = url.slice(0, -1)
      }
    }
    return url
  }

}

module.exports = Realm