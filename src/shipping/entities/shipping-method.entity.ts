import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ShippingLine } from './shipping-line.entity';

@Entity()
export class ShippingMethod extends CoreEntity {
  @Column({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    (type) => ShippingLine,
    (shippingLine) => shippingLine.shippingMethod,
  )
  shippingLines: ShippingLine[];

  @Column()
  fulfillmentHandlerCode: string;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
