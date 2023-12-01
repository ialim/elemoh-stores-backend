import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateStoreStockLevelOutput,
  CreateStoreStockLevelInput,
} from './dtos/create-store-stock-level.dto';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import {
  DeleteStoreStockLevelOutput,
  DeleteStoreStockLevelInput,
} from './dtos/delete-store-stock-level.dto';
import { DeleteStoreOutput, DeleteStoreInput } from './dtos/delete-store.dto';
import {
  EditStoreStockLevelOutput,
  EditStoreStockLevelInput,
} from './dtos/edit-store-stock-level.dto';
import { EditStoreOutput, EditStoreInput } from './dtos/edit-store.dto';
import { AllStoreStockLevelOutput } from './dtos/find-all-store-stock-level.dto';
import { AllStoreOutput } from './dtos/find-all-stores.dto';
import {
  FindStoreStockLevelOutput,
  FindStoreStockLevelInput,
} from './dtos/find-store-stock-level.dto';
import { FindStoreOutput, FindStoreInput } from './dtos/find-store.dto';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Resolver((of) => Store)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation((returns) => CreateStoreOutput)
  async createStore(
    @Args('input') createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    return await this.storesService.createStore(createStoreInput);
  }

  @Mutation((returns) => EditStoreOutput)
  async editStore(
    @Args('input') editStoreInput: EditStoreInput,
  ): Promise<EditStoreOutput> {
    return await this.storesService.editStore(editStoreInput);
  }

  @Mutation((returns) => DeleteStoreOutput)
  async deleteStore(
    @Args() deleteStoreInput: DeleteStoreInput,
  ): Promise<DeleteStoreOutput> {
    return await this.storesService.deleteStore(deleteStoreInput);
  }

  @Mutation((returns) => FindStoreOutput)
  async findStore(
    @Args() findStoreInput: FindStoreInput,
  ): Promise<FindStoreOutput> {
    return await this.storesService.findStore(findStoreInput);
  }

  @Mutation((returns) => AllStoreOutput)
  async findAllStore(): Promise<AllStoreOutput> {
    return await this.storesService.findAllStore();
  }

  @Mutation((returns) => CreateStoreStockLevelOutput)
  async createGroupStore(
    @Args('input') createStoreStockLevelInput: CreateStoreStockLevelInput,
  ): Promise<CreateStoreStockLevelOutput> {
    return await this.storesService.createStoreStockLevel(
      createStoreStockLevelInput,
    );
  }

  @Mutation((returns) => EditStoreStockLevelOutput)
  async editStoreStockLevel(
    @Args('input') editStoreStockLevelInput: EditStoreStockLevelInput,
  ): Promise<EditStoreStockLevelOutput> {
    return await this.storesService.editStoreStockLevel(
      editStoreStockLevelInput,
    );
  }

  @Mutation((returns) => DeleteStoreStockLevelOutput)
  async deleteStoreStockLevel(
    @Args() deleteStoreStockLevelInput: DeleteStoreStockLevelInput,
  ): Promise<DeleteStoreStockLevelOutput> {
    return await this.storesService.deleteStoreStockLevel(
      deleteStoreStockLevelInput,
    );
  }

  @Mutation((returns) => FindStoreStockLevelOutput)
  async findStoreStockLevel(
    @Args() findStoreStockLevelInput: FindStoreStockLevelInput,
  ): Promise<FindStoreStockLevelOutput> {
    return await this.storesService.findStoreStockLevel(
      findStoreStockLevelInput,
    );
  }

  @Mutation((returns) => AllStoreStockLevelOutput)
  async findAllStoreStockLevel(): Promise<AllStoreStockLevelOutput> {
    return await this.storesService.findAllStoreStockLevel();
  }
}
