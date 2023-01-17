import { Injectable } from "@nestjs/common";
// import xrpl from "xrpl";
const xrpl = require('xrpl')
@Injectable()
export class XrpService {

    
    async createWallet(){
        const MY_SERVER = "ws://localhost:5005";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        const fund_result = await client.fundWallet();
        const test_wallet = fund_result.wallet;
        console.log(fund_result)
        return  test_wallet
    }

    async generateKey(){
        const MY_SERVER = "ws://localhost:5005";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        const test_wallet = xrpl.Wallet.generate();
        console.log(test_wallet);
        return  test_wallet
    }
}