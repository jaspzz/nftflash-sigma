exports.handler = async function(request, response) {
    const res = await axios_1.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${req.body.contractID}&apikey=` + process.env.INFURA_API_KEY
    )
    const abi = JSON.parse(res.data.result)
    res.json({"abi":abi})
    response.send({"message": "Successfully executed"});
}