import { Controller, Get } from "@nestjs/common";
import { XrpService } from "../service/xrp.service";



@Controller('xrp')
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

}