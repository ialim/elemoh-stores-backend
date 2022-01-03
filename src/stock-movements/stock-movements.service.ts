import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import {
  CreateStockAdjustmentInput,
  CreateStockAdjustmentOutput,
} from './dtos/create-stock-adjustment.dto';
import {
  DeleteStockAdjustmentInput,
  DeleteStockAdjustmentOutput,
} from './dtos/delete-stock-adjustment.dto';
import { EditStockAdjustmentInput } from './dtos/edit-stock-adjustment.dto';
import { AllStockAdjustmentOutput } from './dtos/find-all-stock-adjustments.dto';
import {
  FindStockAdjustmentInput,
  FindStockAdjustmentOutput,
} from './dtos/find-stock-adjustment.dto';
import { StockAdjustment } from './entities/stock-adjustment.entity';
import { StockPurchase } from './entities/stock-purchase.entity';

@Injectable()
export class StockMovementsService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(StockAdjustment)
    private readonly stockAdjustments: Repository<StockAdjustment>,
    @InjectRepository(StockPurchase)
    private readonly stockPurchases: Repository<StockPurchase>,
  ) {}

  /** Stock Adjustment Services */
  async createStockAdjustment({
    productVariantId,
    quantity,
  }: CreateStockAdjustmentInput): Promise<CreateStockAdjustmentOutput> {
    try {
      const result = await this.productsService.findProductVariant({
        productVariantId,
      });
      if (!result.ok) {
        return {
          ok: false,
          error: result.error,
        };
      }
      const stockAdjustment = await this.stockAdjustments.findOne({
        id: result.productVariant.id,
      });
      if (!stockAdjustment) {
        await this.stockAdjustments.save(
          this.stockAdjustments.create({
            quantity,
            productVariant: result.ok ? result.productVariant : null,
          }),
        );
        return { ok: true, error: null };
      }
      return { ok: false, error: 'Stock Adjustment record exist' };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async editStockAdjustment({
    quantity,
    productVariantId,
    stockAdjustmentId,
  }: EditStockAdjustmentInput): Promise<CreateStockAdjustmentOutput> {
    try {
      const result = await this.productsService.findProductVariant({
        productVariantId,
      });
      const stockAdjustment = await this.stockAdjustments.findOne({
        id: stockAdjustmentId,
      });
      if (!stockAdjustment && !result.ok) {
        return {
          ok: false,
          error: 'Either Stock Adjustment or ProductVariant does not exist',
        };
      }
      quantity && (stockAdjustment.quantity = quantity);
      stockAdjustment.productVariant = result.productVariant;
      await this.stockAdjustments.save(stockAdjustment);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteStockAdjustment({
    stockAdjustmentId,
  }: DeleteStockAdjustmentInput): Promise<DeleteStockAdjustmentOutput> {
    try {
      const stockAdjustment = await this.stockAdjustments.findOne({
        id: stockAdjustmentId,
      });
      if (!stockAdjustment) {
        return { ok: false, error: 'StockAdjustment not found' };
      }
      await this.stockAdjustments.remove(stockAdjustment);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findStockAdjustment({
    stockAdjustmentId,
  }: FindStockAdjustmentInput): Promise<FindStockAdjustmentOutput> {
    try {
      const stockAdjustment = await this.stockAdjustments.findOne({
        id: stockAdjustmentId,
      });
      if (!stockAdjustment) {
        return { ok: false, error: 'StockAdjustment not found' };
      }
      return { ok: true, error: null, stockAdjustment };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findAllStockAdjustment(): Promise<AllStockAdjustmentOutput> {
    try {
      const stockAdjustments = await this.stockAdjustments.find();
      if (!stockAdjustments) {
        return {
          ok: false,
          error: 'StockAdjustments not found',
        };
      }
      return {
        ok: true,
        stockAdjustments,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  /** Stock Purchase Services */
  async createStockPurchase(){}
}
