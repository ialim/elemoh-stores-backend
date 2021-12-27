import { Channel } from 'src/channels/entities/channel.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Promotion extends CoreEntity {
  @Column({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Column({ type: Date, nullable: true })
  startsAt: Date | null;

  @Column({ type: Date, nullable: true })
  endsAt: Date | null;

  @Column({ nullable: true })
  couponCode: string;

  @Column({ nullable: true })
  perCustomerUsageLimit: number;

  @Column() name: string;

  @Column() enabled: boolean;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
