import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleService } from 'src/people/people.service';
import { Repository } from 'typeorm';
import {
  CreateSupplierInput,
  CreateSupplierOutput,
} from './dtos/create-supplier.dto';
import {
  DeleteSupplierInput,
  DeleteSupplierOutput,
} from './dtos/delete-supplier.dto';
import {
  EditSupplierInput,
  EditSupplierOutput,
} from './dtos/edit-supplier.dto';
import { AllSupplierOutput } from './dtos/find-all-suppliers.dto';
import {
  FindSupplierInput,
  FindSupplierOutput,
} from './dtos/find-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly peopleService: PeopleService,
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
  ) {}

  async createSupplier({
    personId,
    VATNumber,
  }: CreateSupplierInput): Promise<CreateSupplierOutput> {
    try {
      const personResult = await this.peopleService.findPerson({ personId });
      if (personResult.ok) {
        await this.suppliers.save(
          this.suppliers.create({
            person: personResult.person,
            VATNumber,
          }),
        );
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Supplier already exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editSupplier({
    supplierId,
    VATNumber,
  }: EditSupplierInput): Promise<EditSupplierOutput> {
    try {
      const supplier = await this.suppliers.findOne(
        {
          id: supplierId,
        },
        {
          relations: ['person'],
        },
      );
      if (!supplier) {
        return {
          ok: false,
          error: 'Supplier not found',
        };
      }

      VATNumber && (supplier.VATNumber = VATNumber);

      await this.suppliers.save(supplier);
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

  async deleteSupplier({
    supplierId,
  }: DeleteSupplierInput): Promise<DeleteSupplierOutput> {
    try {
      const Supplier = await this.suppliers.findOne({ id: supplierId });
      if (!Supplier) {
        return {
          ok: false,
          error: 'Supplier not found',
        };
      }
      await this.suppliers.remove(Supplier);
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

  async findSupplier({
    supplierId,
  }: FindSupplierInput): Promise<FindSupplierOutput> {
    try {
      const supplier = await this.suppliers.findOne(
        { id: supplierId },
        { relations: ['purchases', 'person'] },
      );
      if (!supplier) {
        return {
          ok: false,
          error: 'Supplier not found',
        };
      }
      return {
        ok: true,
        supplier,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllSupplier(): Promise<AllSupplierOutput> {
    try {
      const suppliers = await this.suppliers.find({
        relations: ['person'],
      });
      if (!suppliers) {
        return {
          ok: false,
          error: 'Suppliers not found',
        };
      }
      return {
        ok: true,
        suppliers,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
