import { Module } from "@nestjs/common";
import { XrpController } from "./controller/xrp.controller";
import { XrpService } from "./service/xrp.service";


@Module({
    providers:[XrpService],
    controllers:[XrpController]
})

export class XrpModule{}