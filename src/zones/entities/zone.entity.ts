import { CoreEntity } from 'src/common/entities/core.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Zone extends CoreEntity {
  @Column() name: string;

  @ManyToMany((type) => Country)
  @JoinTable()
  members: Country[];
}
