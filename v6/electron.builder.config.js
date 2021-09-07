module.exports = {
  "appId": "v6",
  "mac": {
    "category": "your.app.category.type"
  },
  'win': {
    target: {
      target: 'nsis',
      arch: 'ia32'
    },
  },
  publish:[
    {
      provider: 'generic',
      url: 'http://192.168.1.139:8080/v6'
    }
  ]
}
