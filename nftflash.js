exports.handler = function(request, response) {
    "use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const functions = require("firebase-functions")
const axios_1 = require("axios")
const Web3 = require("web3")
const admin = require("firebase-admin")
admin.initializeApp()

const addStats = () => {
  functions.logger.log(data?.uid)
  response.send({"message": "Successfully executed"});
  return admin.firestore().collection("nftProjects").doc(data.uid).update(data)
}
export const onProjectCreate = functions.firestore
  .document("/nftProjects/{documentId}")
  .onCreate(async (snap, context) => {
    const project = snap.data()
    try {
      const web3 = new Web3(
        "https://mainnet.infura.io/v3/837aef1d2c734a2981982a1dc91d5890"
      )
      const res = await axios_1.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${project.contractID}&apikey=KR34DNBNECSG4WBVYFUHCPFRNPJXZEVQA1`
      )
      const smartContract = await createContract(
        web3,
        res.data.result,
        project.contractID
      )
      // const getProjectName = (contract, contractFunction) => {
      //   return eval(`contract.methods.${contractFunction}().call()`);
      // };
      const estimatedGasLimit = await estimateGasLimit(
        smartContract,
        project.mintFunction
      )
      const mintPrice = await getMintPrice(
        smartContract,
        project.mintFeeFunction
      )
      const maxSupply = await getMaxSupply(
        smartContract,
        project.totalSupplyFunction
      )
      const currentTokens = await getCurrentTokens(
        smartContract,
        project.currentSupplyFunction
      )
      const data = {
        maxSupply: maxSupply,
        mintPrice: mintPrice,
        currentSupply: currentTokens,
        gasLimit: estimatedGasLimit,
        uid: context.params.documentId,
      }
      await addStats(data)
    } catch (error) {
      functions.logger.log(error)
    }
    return { status: "success" }
  })

const getMintPrice = (contract, contractFunction) => {
  return eval(`contract.methods.${contractFunction}().call()`)
}
const getMaxSupply = (contract, contractFunction) => {
  return eval(`contract.methods.${contractFunction}().call()`)
}
const getCurrentTokens = (contract, contractFunction) => {
  return eval(`contract.methods.${contractFunction}().call()`)
}
const estimateGasLimit = (contract, contractFunction) => {
  return eval(
    `contract.methods.${contractFunction}(1).estimateGas({from: "0x874437B5a42aA6E6419eC2447C9e36c278c46532", value:200000000000000000})`
  )
}
const createContract = (
  web3,
  abi,
  contractID
) => {
  return new web3.eth.Contract(JSON.parse(abi), contractID)
}
//# sourceMappingURL=index.js.map
}