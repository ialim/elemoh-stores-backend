import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllFacetOutput } from './dtos/all-facets.dto';
import {
  CreateFacetValueInput,
  CreateFacetValueOutput,
} from './dtos/create-facet-value.dto';
import { CreateFacetInput, CreateFacetOutput } from './dtos/create-facet.dto';
import {
  DeleteFacetValueInput,
  DeleteFacetValueOutput,
} from './dtos/delete-facet-value.dto';
import { DeleteFacetInput, DeleteFacetOutput } from './dtos/delete-facet.dto';
import {
  EditFacetValueInput,
  EditFacetValueOutput,
} from './dtos/edit-facet-value.dto';
import { EditFacetInput, EditFacetOutput } from './dtos/edit-facet.dto';
import { FacetValue } from './entities/facet-value.entity';
import { Facet } from './entities/facet.entity';

@Injectable()
export class FacetsService {
  constructor(
    @InjectRepository(Facet) private readonly facets: Repository<Facet>,
    @InjectRepository(FacetValue)
    private readonly facetValues: Repository<FacetValue>,
  ) {}

  async createFacet({
    name,
    isPrivate,
    code,
  }: CreateFacetInput): Promise<CreateFacetOutput> {
    try {
      const exists = await this.facets.findOne({ name });
      if (exists) {
        return { ok: false, error: 'This facet already exist' };
      }
      await this.facets.save(this.facets.create({ name, code, isPrivate }));
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't create facet" };
    }
  }

  async editFacet({
    facetId,
    name,
    code,
    isPrivate,
  }: EditFacetInput): Promise<EditFacetOutput> {
    try {
      const facet = await this.facets.findOne({ id: facetId });
      if (facet) {
        name && (facet.name = name);
        code && (facet.code = code);
        isPrivate && (facet.isPrivate = isPrivate);
        await this.facets.save(facet);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'Facet not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findAll(): Promise<AllFacetOutput> {
    try {
      const facets = await this.facets.find({ relations: ['values'] });
      if (facets) {
        return {
          ok: true,
          error: null,
          facets: facets,
        };
      }
      return {
        ok: false,
        error: 'No facets available',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteFacet({ facetId }: DeleteFacetInput): Promise<DeleteFacetOutput> {
    try {
      const facet = await this.facets.findOne({ id: facetId });
      if (facet) {
        await this.facets.remove(facet);
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: true,
        error: 'Facet not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async createFacetValue({
    facetId,
    name,
    code,
  }: CreateFacetValueInput): Promise<CreateFacetValueOutput> {
    try {
      const facet = await this.facets.findOne({ id: facetId });
      if (facet) {
        const facetValue = await this.facetValues.findOne({ name: name });
        if (!facetValue) {
          const facetValue = await this.facetValues.create({
            facet,
            name,
            code,
          });
          await this.facetValues.save(facetValue);
          return {
            ok: true,
            error: null,
          };
        }
        return {
          ok: false,
          error: 'facet Value already exists',
        };
      }
      return {
        ok: false,
        error: 'facet not found',
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async editFacetValue({
    facetId,
    facetValueId,
    name,
    code,
  }: EditFacetValueInput): Promise<EditFacetValueOutput> {
    try {
      const facet = await this.facets.findOne({ id: facetId });
      if (facet) {
        const facetValue = await this.facetValues.findOne({ id: facetValueId });
        if (!facetValue) {
          return {
            ok: false,
            error: 'facet Value does not exist',
          };
        }
        name && (facetValue.name = name);
        code && (facetValue.code = code);
        await this.facetValues.save(facetValue);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'Facet not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async deleteFacetValue({
    facetId,
    facetValueId,
  }: DeleteFacetValueInput): Promise<DeleteFacetValueOutput> {
    try {
      const facet = await this.facets.findOne({ id: facetId });
      if (facet) {
        const facetValue = await this.facetValues.findOne({ id: facetValueId });
        if (!facetValue) {
          return {
            ok: false,
            error: 'facet Value does not exist',
          };
        }
        await this.facetValues.remove(facetValue);
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'Facet not found',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }
}
