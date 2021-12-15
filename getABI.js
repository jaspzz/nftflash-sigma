const axios = require('axios')

exports.handler = async function(request, response) {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    const data = JSON.parse(request.body)
    console.log(`https://api.etherscan.io/api?module=contract&action=getabi&address=${data.contractID}&apikey=` + process.env.INFURA_API_KEY)
    const res = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${data.contractID}&apikey=` + process.env.INFURA_API_KEY
    )
    const abi = JSON.parse(res.data.result)
    response.json({"abi":abi})
    response.send({"message": "Successfully executed"});
}