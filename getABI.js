const axios = require('axios')

exports.handler = async function(request, response) {
    const res = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${request.body.contractID}&apikey=` + process.env.INFURA_API_KEY
    )
    functions.logger.log(`https://api.etherscan.io/api?module=contract&action=getabi&address=${request.body.contractID}&apikey=` + process.env.INFURA_API_KEY)
    const abi = JSON.parse(res.data.result)
    response.json({"abi":abi})
    response.send({"message": "Successfully executed"});
}