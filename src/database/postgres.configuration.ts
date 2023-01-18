import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class PostgresConfiguration implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options:TypeOrmModuleOptions=
      {
        type:"postgres",
        host:"localhost",
        port:5432,
        username:"postgres",
        password:"123456",
        database:"xrp",
        autoLoadEntities:true,
        synchronize:true
      }
      return options
  }

}