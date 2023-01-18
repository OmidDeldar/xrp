import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignTransactionDto } from "../dtos/sign-transaction.dto";
import { XrpService } from "../service/xrp.service";



@Controller('xrp')
@ApiTags('xrp')
export class XrpController {
    constructor(private xrpService: XrpService){}

    @Get('create/wallet')
    createWallet(){
        return this.xrpService.createWallet();
    }

    @Get('generate/address')
    generateAddress(){
        return this.xrpService.generateKey();
    }

    @Get('get/balance')
    getBalance(@Query('address') address: string){
        return this.xrpService.getBalance(address);
    }

    @Post('sign/transaction')
    signTransaction(
        @Body() signTransactionDto: SignTransactionDto
        ){
        return this.xrpService.signTransaction(signTransactionDto);
    }

    @Get("check/transaction")
    checkTransaction(@Query('hash') hash: string){
        return this.xrpService.checkTransaction(hash);
    }

}