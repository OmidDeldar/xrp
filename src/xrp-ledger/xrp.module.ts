import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XrpController } from "./controller/xrp.controller";
import { XrpWalletEntity } from "./entities/xrp.entity";
import { XrpService } from "./service/xrp.service";


@Module({
    imports:[TypeOrmModule.forFeature([XrpWalletEntity])],
    providers:[XrpService],
    controllers:[XrpController]
})

export class XrpModule{}