const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const Web3 = require('web3');

const mnemonic = fs.readFileSync(".secret").toString().trim();
const precompiled_abi = fs.readFileSync('./contracts/abi/Precompiled_sol_Precompiled.abi', 'utf-8');
const precompiled_address = "";
const network = "https://dev-evm.dev.findora.org:8545";

async function main() {
    const provider = new HDWalletProvider(mnemonic, network);
    const web3 = new Web3(provider);

    const precompiledContract = new web3.eth.Contract(
        precompiled_abi,
        precompiled_address,
        {gasLimit: "5500000"}
    );

    /************************* 0x01 => ecrecover *************************/

    const address = '0x5084EC6a09945097956e02fc214222e18Eb4a9f4';
    const pk = '56306611ed6059ba0d1c7147d3e2fa52a9eaf67f8e37a43fde1bfb09368931f9';
    const msg = web3.utils.sha3('findora');
    const signedMsg = await web3.eth.accounts.sign(msg, pk);
    console.log(signedMsg);

    const result = await precompiledContract.methods
        .callEcrecover(signedMsg.messageHash,
            signedMsg.v,
            signedMsg.r,
            signedMsg.s)
        .send();
    console.log("ecrecover address: " + result + "\nexpected address: " + address);

    // TODO: more precompiled contract scripts
}

main();