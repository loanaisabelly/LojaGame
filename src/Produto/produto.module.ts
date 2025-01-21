import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';
import { CategoriaModule } from '../Categoria/categoria.module';
import { CategoriaService } from '../Categoria/services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, CategoriaService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
