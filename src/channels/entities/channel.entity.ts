import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { CurrencyCode, LanguageCode } from 'src/common/generated-types';
import { BeforeInsert, Column, Entity } from 'typeorm';

registerEnumType(CurrencyCode, { name: 'CurrencyCode' });
registerEnumType(LanguageCode, { name: 'LanguageCode' });

@ObjectType()
@Entity()
export class Channel extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  code: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  token: string;

  @Field((type) => LanguageCode)
  @Column({ type: 'enum', enum: LanguageCode })
  @IsEnum(LanguageCode)
  defaultLanguageCode: LanguageCode;

  @Field((type) => CurrencyCode)
  @Column({ type: 'enum', enum: CurrencyCode })
  @IsEnum(CurrencyCode)
  currencyCode: CurrencyCode;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  pricesIncludeTax: boolean;

  @BeforeInsert()
  generateToken(): void {
    const randomString = () => Math.random().toString(36).substr(3, 10);
    this.token = `${randomString()}${randomString()}`;
  }
}
