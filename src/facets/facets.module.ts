import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facet } from './entities/facet.entity';
import { FacetValue } from './entities/facet-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facet, FacetValue])],
})
export class FacetsModule {}
