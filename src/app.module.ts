import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './Produto/entities/produto.entity';
import { ProdutoModule } from './Produto/produto.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { CategoriaModule } from './Categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_LojaoNerd',
      entities: [Produto, Categoria],
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
