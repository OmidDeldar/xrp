import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import xrpl from "xrpl";
// const xrpl = require('xrpl')
import * as xrpl from "xrpl";
import { SignTransactionDto } from "../dtos/sign-transaction.dto";
import { XrpWalletEntity } from "../entities/xrp.entity";
@Injectable()
export class XrpService {
    constructor(
        @InjectRepository(XrpWalletEntity) private xrpWalletRepo:Repository<XrpWalletEntity>
    ){}
    
    async createWallet(){
        const MY_SERVER = "wss://s.altnet.rippletest.net:51233";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        const fund_result = await client.fundWallet();
        const wallet = fund_result.wallet;
        const xrpWalletEntity = new XrpWalletEntity();
        xrpWalletEntity.address = wallet.address;
        xrpWalletEntity.classic_address = wallet.classicAddress;
        xrpWalletEntity.privateKey = wallet.privateKey;
        xrpWalletEntity.publicKey = wallet.publicKey;
        xrpWalletEntity.seed = wallet.seed;
        await this.xrpWalletRepo.save(xrpWalletEntity);
        client.disconnect();
        return wallet
    }

    async generateKey(){
        const MY_SERVER = "wss://s.altnet.rippletest.net:51233";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        const wallet = xrpl.Wallet.generate();
        const xrpWalletEntity = new XrpWalletEntity();
        xrpWalletEntity.address = wallet.address;
        xrpWalletEntity.classic_address = wallet.classicAddress;
        xrpWalletEntity.privateKey = wallet.privateKey;
        xrpWalletEntity.publicKey = wallet.publicKey;
        xrpWalletEntity.seed = wallet.seed;
        await this.xrpWalletRepo.save(xrpWalletEntity);
        client.disconnect();
        return  wallet
    }


    async getBalance(address: string) {
        const MY_SERVER = "wss://s.altnet.rippletest.net:51233";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect().then(() => {
            client.getBalances(address).then((balance: any) => {
                console.log(balance,null, 2);
                client.disconnect()
                return balance
            })
        });

        // const server = await client.connect();
        // const balance = client.getBalances(address);
        // console.log(balance);
        // client.disconnect();
        // return balance
        
    }


    async signTransaction(signTransactionDto: SignTransactionDto){
        const MY_SERVER = "wss://s.altnet.rippletest.net:51233";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        const from_address = xrpl.Wallet.fromSeed(signTransactionDto.from_seed,{masterAddress:signTransactionDto.from_address});
        // const aa=xrpl.Wallet.fromSecret(from,{masterAddress:'sdfopjsl;kosd'})
        // const from_address = await client.fundWallet();
        const preparedTransaction = await client.autofill({
            "TransactionType": "Payment",
            "Account": from_address.classicAddress,
            // "Amount": xrpl.xrpToDrops("1"),
            "Amount": signTransactionDto.amount,
            "Destination": signTransactionDto.to_address
        });

        const signed = from_address.sign(preparedTransaction);
        const result = await client.submitAndWait(signed.tx_blob);
        client.disconnect();
        return result;
    }

    async checkTransaction(hash: string){
        const MY_SERVER = "wss://s.altnet.rippletest.net:51233";
        const client = new xrpl.Client(MY_SERVER);
        await client.connect();
        
        let transaction_response = await client.request({
            "command": "tx",
            "transaction": hash,
            "transactions": true,
        })

        client.disconnect();

        return transaction_response;
    }
}