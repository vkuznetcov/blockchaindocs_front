const Web3 = require('web3')
const web3 = new Web3('https://goerli.infura.io/v3/304127ae5cee4e06b114cb3d57749335')

let data = 'My document'

let value = web3.utils.asciiToHex(data)
let added = web3.utils.padRight(web3.utils.asciiToHex(data), 64)

console.log(web3.utils.sha3(data))
console.log(added)