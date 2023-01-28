import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryModule } from "src/utils/history/history.module";
import { XrpController } from "./controller/xrp.controller";
import { XrpWalletEntity } from "./entities/xrp.entity";
import { MonitoringTransactionService } from "./service/monitoring-transaction.service";
import { MonitoringXrpService } from "./service/monitoring.service";
import { XrpService } from "./service/xrp.service";


@Module({
    imports:[
        HistoryModule,
        TypeOrmModule.forFeature([XrpWalletEntity])],
    providers:[XrpService, MonitoringTransactionService],
    controllers:[XrpController]
})

export class XrpModule{}