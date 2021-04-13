import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facet } from './entities/facet.entity';
import { FacetValue } from './entities/facet-value.entity';
import { FacetsResolver } from './facets.resolver';
import { FacetsService } from './facets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facet, FacetValue])],
  providers: [FacetsResolver, FacetsService],
})
export class FacetsModule {}
