import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PaymentMethod extends CoreEntity {
  @Column() code: string;

  @Column() enabled: boolean;

  @Column()
  handler: string;
}
