import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  categoriaService: any;
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findALL(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findByFaixaPreco(
    minPreco: number,
    maxPreco: number,
  ): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        preco: Between(minPreco, maxPreco),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}
