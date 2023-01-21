import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XrpController } from "./controller/xrp.controller";
import { XrpWalletEntity } from "./entities/xrp.entity";
import { MonitoringXrpService } from "./service/monitoring.service";
import { XrpService } from "./service/xrp.service";


@Module({
    imports:[TypeOrmModule.forFeature([XrpWalletEntity])],
    providers:[XrpService, MonitoringXrpService],
    controllers:[XrpController]
})

export class XrpModule{}