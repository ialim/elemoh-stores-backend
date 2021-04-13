import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { Facet } from './entities/facet.entity';
import { FacetsService } from './facets.service';

@Resolver((of) => Facet)
export class FacetsResolver {
  constructor(private readonly facetsService: FacetsService) {}

  @Mutation((returns) => CreateFacetOutput)
  async createFacet(
    @Args('input') createFacetInput: CreateFacetInput,
  ): Promise<CreateFacetOutput> {
    return await this.facetsService.createFacet(createFacetInput);
  }

  @Mutation((returns) => EditFacetOutput)
  async editFacet(
    @Args('input') editFacetInput: EditFacetInput,
  ): Promise<EditFacetOutput> {
    return await this.facetsService.editFacet(editFacetInput);
  }

  @Query((returns) => AllFacetOutput)
  async allFacets(): Promise<AllFacetOutput> {
    return await this.facetsService.findAll();
  }

  @Mutation((returns) => DeleteFacetOutput)
  async deleteFacet(
    @Args() deleteFacetInput: DeleteFacetInput,
  ): Promise<DeleteFacetOutput> {
    return await this.facetsService.deleteFacet(deleteFacetInput);
  }

  @Mutation((returns) => CreateFacetValueOutput)
  async createFacetValue(
    @Args('input') createFacetValueInput: CreateFacetValueInput,
  ): Promise<CreateFacetValueOutput> {
    return await this.facetsService.createFacetValue(createFacetValueInput);
  }

  @Mutation((returns) => EditFacetValueOutput)
  async editFacetValue(
    @Args('input') editFacetValueInput: EditFacetValueInput,
  ): Promise<EditFacetValueOutput> {
    return await this.facetsService.editFacetValue(editFacetValueInput);
  }

  @Mutation((returns) => DeleteFacetValueOutput)
  async deleteFacetValue(
    @Args() deleteFacetValueInput: DeleteFacetValueInput,
  ): Promise<EditFacetValueOutput> {
    return await this.facetsService.deleteFacetValue(deleteFacetValueInput);
  }
}
