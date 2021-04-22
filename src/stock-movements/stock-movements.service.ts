import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from 'src/products/entities/product-variant.entity';
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
import { StockMovement } from './entities/stock-movement.entity';

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(StockMovement)
    private readonly stockMovements: Repository<StockMovement>,
    @InjectRepository(ProductVariant)
    private readonly productVariants: Repository<ProductVariant>,
  ) {}

  async createStockAdjustment({
    productVariantId,
    quantity,
  }: CreateStockAdjustmentInput): Promise<CreateStockAdjustmentOutput> {
    try {
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      const stcokAdjustment = await this.stockMovements.find({
        productVariant,
      });
      if (!stcokAdjustment) {
        await this.stockMovements.save(
          this.stockMovements.create({
            quantity,
            productVariant,
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
      const productVariant = await this.productVariants.findOne({
        id: productVariantId,
      });
      const stockAdjustment = await this.stockMovements.findOne({
        id: stockAdjustmentId,
      });
      if (!stockAdjustment && !productVariant) {
        return {
          ok: false,
          error: 'Either Stock Adjustment or ProductVariant does not exist',
        };
      }
      quantity && (stockAdjustment.quantity = quantity);
      stockAdjustment.productVariant = productVariant;
      await this.stockMovements.save(stockAdjustment);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async deleteStockAdjustment({
    stockAdjustmentId,
  }: DeleteStockAdjustmentInput): Promise<DeleteStockAdjustmentOutput> {
    try {
      const stockAdjustment = await this.stockMovements.findOne({
        id: stockAdjustmentId,
      });
      if (!stockAdjustment) {
        return { ok: false, error: 'StockAdjustment not found' };
      }
      await this.stockMovements.remove(stockAdjustment);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
