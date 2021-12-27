import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateStockAdjustmentInput,
  CreateStockAdjustmentOutput,
} from './dtos/create-stock-adjustment.dto';
import {
  DeleteStockAdjustmentInput,
  DeleteStockAdjustmentOutput,
} from './dtos/delete-stock-adjustment.dto';
import {
  EditStockAdjustmentInput,
  EditStockAdjustmentOutput,
} from './dtos/edit-stock-adjustment.dto';
import {
  FindStockAdjustmentInput,
  FindStockAdjustmentOutput,
} from './dtos/find-stock-adjustment.dto';
import { StockMovement } from './entities/stock-movement.entity';
import { StockMovementsService } from './stock-movements.service';

@Resolver((of) => StockMovement)
export class StockMovementsResolver {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Mutation((returns) => CreateStockAdjustmentOutput)
  async createStockAdjustment(
    @Args('input') createStockAdjustmentInput: CreateStockAdjustmentInput,
  ): Promise<CreateStockAdjustmentOutput> {
    return await this.stockMovementsService.createStockAdjustment(
      createStockAdjustmentInput,
    );
  }

  @Mutation((returns) => EditStockAdjustmentOutput)
  async editStockAdjustment(
    @Args('input') editStockAdjustmentInput: EditStockAdjustmentInput,
  ): Promise<EditStockAdjustmentOutput> {
    return await this.stockMovementsService.editStockAdjustment(
      editStockAdjustmentInput,
    );
  }

  @Mutation((returns) => DeleteStockAdjustmentOutput)
  async deleteStockAdjustment(
    @Args() deleteStockAdjustmentInput: DeleteStockAdjustmentInput,
  ): Promise<DeleteStockAdjustmentOutput> {
    return await this.stockMovementsService.deleteStockAdjustment(
      deleteStockAdjustmentInput,
    );
  }

  @Query((returns) => FindStockAdjustmentOutput)
  async findStockAdjustment(
    @Args() findStockAdjustmentInput: FindStockAdjustmentInput,
  ): Promise<FindStockAdjustmentOutput> {
    return await this.stockMovementsService.findStockAdjustment(
      findStockAdjustmentInput,
    );
  }
}
