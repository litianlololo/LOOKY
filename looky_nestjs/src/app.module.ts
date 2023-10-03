import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 加载连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '110.40.206.206', // 数据库ip地址
      port: 3306, // 端口
      username: 'litianlololo', // 登录名
      password: '888htg328', // 密码
      database: 'looky', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      autoLoadEntities: true,
      synchronize: false, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    // 加载子模块
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
