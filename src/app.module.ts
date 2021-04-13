import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { AssetsModule } from './assets/assets.module';
import { FacetsModule } from './facets/facets.module';
import { CollectionsModule } from './collections/collections.module';
import { ChannelsModule } from './channels/channels.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { Store } from './stores/entities/store.entity';
import { Asset } from './assets/entities/asset.entity';
import { ProductAsset } from './products/entities/product-asset.entity';
import { Product } from './products/entities/product.entity';
import { ProductVariant } from './products/entities/product-variant.entity';
import { ProductVariantAsset } from './products/entities/product-variant-asset.entity';
import { ProductVariantPrice } from './products/entities/product-variant-price.entity';
import { Channel } from './channels/entities/channel.entity';
import { StockMovement } from './stock-movements/entities/stock-movement.entity';
import { FacetValue } from './facets/entities/facet-value.entity';
import { Facet } from './facets/entities/facet.entity';
import { Collection } from './collections/entities/collection.entity';
import { CollectionAsset } from './collections/entities/collection-asset.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        Asset,
        Channel,
        Collection,
        CollectionAsset,
        Facet,
        FacetValue,
        Product,
        ProductAsset,
        ProductVariant,
        ProductVariantAsset,
        ProductVariantPrice,
        StockMovement,
        Store,
        User,
        Verification,
      ],
    }),
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req['user'] }),
    }),
    JwtModule.forRoot({
      privateKey: process.env.SECRET_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    StoresModule,
    ProductsModule,
    AssetsModule,
    FacetsModule,
    CollectionsModule,
    ChannelsModule,
    StockMovementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
