const Web3 = require('web3');
const Precompiled = artifacts.require("../contracts/Precompiled.sol");

// Provider
const web3 = new Web3('https://dev-evm.dev.findora.org:8545');

contract("Precompiled Contracts", (accounts) => {

    let precompiled;

    before(async () => {
        precompiled = await Precompiled.new();
    });

    describe('0x01 => ecrecover', () => {
        it('verify ecrecover method', async () => {
            const address = '0x5084EC6a09945097956e02fc214222e18Eb4a9f4';
            const pk = '56306611ed6059ba0d1c7147d3e2fa52a9eaf67f8e37a43fde1bfb09368931f9';
            const msg = web3.utils.sha3('findora');
            const signedMsg = await web3.eth.accounts.sign(msg, pk);
            console.log(signedMsg);
            // {
            //     message: '0xeb75d04fa8387324cd7f3eed15f7c5be1be34b53cb0bd921a95e753e90e9fe66',
            //     messageHash: '0x83efaa04ed1b48c2adc056674aead8ce71d694d62b70350a62356b882efcff5e',
            //     v: '0x1c',
            //     r: '0x7e3bbdd8043d3c7ed51a6601584f8bc68a8204d34de3a7b4410e6e5a53c3f840',
            //     s: '0x515bf8ef40e6f822b9be7bb49ef3a10e41b8fe884c920b6b2162786e133b127f',
            //     signature: '0x7e3bbdd8043d3c7ed51a6601584f8bc68a8204d34de3a7b4410e6e5a53c3f840515bf8ef40e6f822b9be7bb49ef3a10e41b8fe884c920b6b2162786e133b127f1c'
            // }

            const result = await precompiled.callEcrecover(
                signedMsg.messageHash,
                signedMsg.v,
                signedMsg.r,
                signedMsg.s,
            );
            console.log(result);
            assert.equal(result, address);
        });
    });

    // TODO: more precompiled contract testing
});