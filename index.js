const Web3 = require('web3')
const {CONTRACT_ABI, CONTRACT_ADDRESS, ACCOUNT_ADDRESS, INFURA_API_KEY, METAMASK_PRIVATE_KEY} = require("./consts")

async function addDocument(data, metadata) {

    const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/' + INFURA_API_KEY))
    const account = web3.eth.accounts.privateKeyToAccount(METAMASK_PRIVATE_KEY)
    let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)


    let nonce = await web3.eth.getTransactionCount(account.address, 'latest')
    let gasPrice = await web3.eth.getGasPrice()
    let gasLimit = 3000000
    let hex = web3.utils.padRight(web3.utils.asciiToHex(data), 64)

    const transaction = {
        from: account.address,
        to: CONTRACT_ADDRESS,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        value: 0x00,
        data: contract.methods.addDocument(hex, metadata).encodeABI()
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, METAMASK_PRIVATE_KEY)
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', console.log)
    // console.log('Transaction hash:', result.transactionHash);
}

async function verifyDocument(data, metadata) {

    const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/' + INFURA_API_KEY))
    const account = web3.eth.accounts.privateKeyToAccount(METAMASK_PRIVATE_KEY)
    let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)


    let nonce = await web3.eth.getTransactionCount(account.address, 'latest')
    let gasPrice = await web3.eth.getGasPrice()
    let gasLimit = 3000000
    let hex = web3.utils.padRight(web3.utils.asciiToHex(data), 64)

    contract.methods.verifyDocument(hex, {from: account.address}).call().then(console.log)
}
verifyDocument('My document2', 'metadata2').then(r => console.log(r))
// web3.eth.getBalance("0x578275e788B8e10f43A4b1F624b0007D930216Ce").then(r => console.log(web3.utils.fromWei(r, 'ether')))