const logger			= require( './../utils/logger' );
const request           = require( 'request');
const moment            = require('moment');
const wosukiJson        = require('../public/assets/contracts/WolsukiCore.json');
// todo: config web3 and account
const Web3              = require("web3");
const solc              = require("solc");
const Tx                = require('ethereumjs-tx');
const ethereumUri       = "https://rinkeby.infura.io/HAeMuZA8JcmelwXOnAaJ";
const web3Provider      = new Web3.providers.HttpProvider(ethereumUri);
const web3              = new Web3( web3Provider );
const account           = "0x22c50e556e8e73d7161cd76fc4b16a6a22063e06";
const key               = new Buffer('16BC040A24CC874F678C9F621722F21EAA490ABD3B1DBF51E3A761C355F7BD99', 'hex');
const addressContract   = "0x4cc4270213AdD983F6240ab0eDED2468137C88a1";
const {
    NODE_ENV,
} = process.env;

const controller_index = {
    renderAppDashboard: function ( req, res ) {
        web3.eth.getTransactionCount(account, (error, number) => {
            web3.eth.getGasPrice( (err, _gasPrice) => {
                const gasPrice = _gasPrice.toString();
                const gasPriceHex = Web3.utils.toHex(gasPrice);
                const gasLimitHex = Web3.utils.toHex(300000);
                const value = Web3.utils.toHex(Web3.utils.toWei('0.001', 'ether'));
                var tra = {
                    nonce: number,
                    value: value,
                    gasPrice: gasPriceHex,
                    gasLimit: gasLimitHex,
                    data: "0x",
                    to: '0x36502aa8f1455a2e4a864c4d2b37fc57f99de0ac',
                    from: account
                };

                var tx = new Tx(tra);
                tx.sign(key);

                var stx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
                    if (err) { console.log(err); return; }
                    console.log('contract creation tx: ' + hash);
                });
                return res.send('123');
            });
        });

    },
    renderContract: function ( req, res ) {
        var abi = wosukiJson["abi"];
        var bytecode = wosukiJson["bytecode"];
        var Contract = new web3.eth.Contract(abi, addressContract );
        Contract.methods.payments( account ).call({}, ( err, result ) => {
            console.log( result );
        });
        let encodeABI = Contract.methods.createFixture( "test", 1528433155, 1528605955 ).encodeABI();
        web3.eth.getTransactionCount(account, (error, number) => {
            web3.eth.getGasPrice((err, _gasPrice) => {
                const gasPrice = _gasPrice.toString();
                const gasPriceHex = Web3.utils.toHex(gasPrice);
                const gasLimitHex = Web3.utils.toHex(300000);
                const value = Web3.utils.toHex(Web3.utils.toWei('0.001', 'ether'));
                var tra = {
                    nonce: number,
                    gasPrice: gasPriceHex,
                    gasLimit: gasLimitHex,
                    data: encodeABI,
                    to: addressContract,
                    from: account
                };

                var tx = new Tx(tra);
                tx.sign(key);

                var stx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + stx.toString('hex'))
                    .on('transactionHash', hash => {
                        console.log( hash );
                    })
                    .on('receipt', receipt => {
                        console.log(receipt);
                    })
                    .on('error', console.error);
                return res.send('123');
            });
        });
    }
};

module.exports = controller_index;