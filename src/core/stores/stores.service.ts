import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/core/addresses/addresses.service';
import { EmployeesService } from 'src/core/employees/employees.service';
import { ProductsService } from 'src/core/products/products.service';
import { Repository } from 'typeorm';
import {
  CreateStoreStockLevelInput,
  CreateStoreStockLevelOutput,
} from './dtos/create-store-stock-level.dto';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import {
  DeleteStoreStockLevelInput,
  DeleteStoreStockLevelOutput,
} from './dtos/delete-store-stock-level.dto';
import { DeleteStoreInput, DeleteStoreOutput } from './dtos/delete-store.dto';
import {
  EditStoreStockLevelInput,
  EditStoreStockLevelOutput,
} from './dtos/edit-store-stock-level.dto';
import { EditStoreInput, EditStoreOutput } from './dtos/edit-store.dto';
import { AllStoreStockLevelOutput } from './dtos/find-all-store-stock-level.dto';
import { AllStoreOutput } from './dtos/find-all-stores.dto';
import {
  FindStoreStockLevelInput,
  FindStoreStockLevelOutput,
} from './dtos/find-store-stock-level.dto';
import { FindStoreInput, FindStoreOutput } from './dtos/find-store.dto';
import { StoreStockLevel } from './entities/store-stock-level.entity';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly addressesService: AddressesService,
    private readonly employeesService: EmployeesService,
    @InjectRepository(Store) private readonly stores: Repository<Store>,
    @InjectRepository(StoreStockLevel)
    private readonly storeStockLevels: Repository<StoreStockLevel>,
  ) {}

  async createStore({
    name,
    employeeId,
    addressId,
  }: CreateStoreInput): Promise<CreateStoreOutput> {
    try {
      const store = await this.stores.findOne({ name });
      if (!store) {
        const employeeResult = await this.employeesService.findEmployee({
          employeeId,
        });

        const addressResult = await this.addressesService.findAddress({
          addressId,
        });
        if (addressResult.ok && employeeResult.ok) {
          await this.stores.save(
            this.stores.create({
              name,
              address: addressResult.address,
              manager: employeeResult.employee,
            }),
          );
          return {
            ok: true,
            error: null,
          };
        }
        return {
          ok: false,
          error: addressResult.error || employeeResult.error,
        };
      }
      return {
        ok: false,
        error: 'Store already exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editStore({
    name,
    employeeId,
    storeId,
  }: EditStoreInput): Promise<EditStoreOutput> {
    try {
      const store = await this.stores.findOne({ id: storeId });
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      name && (store.name = name);
      if (employeeId) {
        const employeeResult = await this.employeesService.findEmployee({
          employeeId,
        });

        employeeResult.ok && (store.manager = employeeResult.employee);
      }

      await this.stores.save(store);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteStore({ storeId }: DeleteStoreInput): Promise<DeleteStoreOutput> {
    try {
      const store = await this.stores.findOne({ id: storeId });
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      await this.stores.remove(store);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findStore({ storeId }: FindStoreInput): Promise<FindStoreOutput> {
    try {
      const store = await this.stores.findOne(
        { id: storeId },
        { relations: ['manager', 'address'] },
      );
      if (!store) {
        return {
          ok: false,
          error: 'Store not found',
        };
      }
      return {
        ok: true,
        store,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllStore(): Promise<AllStoreOutput> {
    try {
      const stores = await this.stores.find({
        relations: ['manager', 'address'],
      });
      if (!stores) {
        return {
          ok: false,
          error: 'Stores not found',
        };
      }
      return {
        ok: true,
        stores,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  /** Store stock level services */
  async createStoreStockLevel({
    quantity,
    storeId,
    variantId,
  }: CreateStoreStockLevelInput): Promise<CreateStoreStockLevelOutput> {
    try {
      const variantResult = await this.productsService.findProductVariant({
        productVariantId: variantId,
      });
      const store = await this.stores.findOne({ id: storeId });
      const storeStockLevel = await this.storeStockLevels.findOne({
        where: { store, variant: variantResult.productVariant },
      });

      if (!storeStockLevel) {
        if (variantResult.ok && store) {
          await this.storeStockLevels.save(
            this.storeStockLevels.create({
              quantity,
              store,
              variant: variantResult.productVariant,
            }),
          );
          return {
            ok: true,
            error: null,
          };
        }
        return {
          ok: false,
          error: variantResult.error || 'Store not found',
        };
      }
      return {
        ok: false,
        error:
          'Store Stock level for this vairant already exist, try updating exixting record',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editStoreStockLevel({
    quantity,
    variantId,
    storeId,
    storeStockLevelId,
  }: EditStoreStockLevelInput): Promise<EditStoreStockLevelOutput> {
    try {
      const storeStockLevel = await this.storeStockLevels.findOne({
        id: storeStockLevelId,
      });
      if (!storeStockLevel) {
        return {
          ok: false,
          error: 'Store Stock level not found',
        };
      }
      quantity && (storeStockLevel.quantity = quantity);
      if (storeId) {
        const store = await this.stores.findOne({
          id: storeId,
        });

        store && (storeStockLevel.store = store);
      }

      if (variantId) {
        const variantResult = await this.productsService.findProductVariant({
          productVariantId: variantId,
        });

        variantResult.ok &&
          (storeStockLevel.variant = variantResult.productVariant);
      }

      await this.storeStockLevels.save(storeStockLevel);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteStoreStockLevel({
    storeStockLevelId,
  }: DeleteStoreStockLevelInput): Promise<DeleteStoreStockLevelOutput> {
    try {
      const storeStockLevel = await this.storeStockLevels.findOne({
        id: storeStockLevelId,
      });
      if (!storeStockLevel) {
        return {
          ok: false,
          error: 'Store Stock Level not found',
        };
      }
      await this.storeStockLevels.remove(storeStockLevel);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findStoreStockLevel({
    storeStockLevelId,
  }: FindStoreStockLevelInput): Promise<FindStoreStockLevelOutput> {
    try {
      const storeStockLevel = await this.storeStockLevels.findOne(
        { id: storeStockLevelId },
        { relations: ['store', 'variant'] },
      );
      if (!storeStockLevel) {
        return {
          ok: false,
          error: 'Store Stock Level not found',
        };
      }
      return {
        ok: true,
        storeStockLevel,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllStoreStockLevel(): Promise<AllStoreStockLevelOutput> {
    try {
      const storeStockLevels = await this.storeStockLevels.find({
        relations: ['store', 'variant'],
      });
      if (!storeStockLevels) {
        return {
          ok: false,
          error: 'Stores not found',
        };
      }
      return {
        ok: true,
        storeStockLevels,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
