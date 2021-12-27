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
import { JwtMiddleware } from './jwt/jwt.middleware';
import { Address } from './addresses/entities/address.entity';
import { Allocation } from './stock-movements/entities/stock-allocation.entity';
import { Asset } from './assets/entities/asset.entity';
import { Cancellation } from './stock-movements/entities/stock-cancellation.entity';
import { Channel } from './channels/entities/channel.entity';
import { Collection } from './collections/entities/collection.entity';
import { CollectionAsset } from './collections/entities/collection-asset.entity';
import { Country } from './countries/entities/country.entity';
import { Customer } from './customers/entities/customer.entity';
import { CustomerGroup } from './customers/entities/customer-group.etity';
import { Facet } from './facets/entities/facet.entity';
import { FacetValue } from './facets/entities/facet-value.entity';
import { Fulfillment } from './fulfillments/entities/fulfillment.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderLine } from './orders/entities/order-line.entity';
import { OrderModification } from './orders/entities/order-modification.entity';
import { Payment } from './payments/entities/payment.entity';
import { PaymentMethod } from './payments/entities/payment-method.entity';
import { Product } from './products/entities/product.entity';
import { ProductAsset } from './products/entities/product-asset.entity';
import { ProductVariant } from './products/entities/product-variant.entity';
import { ProductVariantAsset } from './products/entities/product-variant-asset.entity';
import { ProductVariantPrice } from './products/entities/product-variant-price.entity';
import { Promotion } from './promotions/entities/promotion.entity';
import { Refund } from './refunds/entities/refund.entity';
import { Release } from './stock-movements/entities/stock-release.entity';
import { Sale } from './stock-movements/entities/stock-sale.entity';
import { ShippingLine } from './shipping/entities/shipping-line.entity';
import { ShippingMethod } from './shipping/entities/shipping-method.entity';
import { StockAdjustment } from './stock-movements/entities/stock-adjustment.entity';
import { StockMovement } from './stock-movements/entities/stock-movement.entity';
import { Store } from './stores/entities/store.entity';
import { Surcharge } from './surcharge/entities/surcharge.entity';
import { TaxCategory } from './taxrates/entities/tax-category.entity';
import { TaxRate } from './taxrates/entities/tax-rate.entity';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { Zone } from './zones/entities/zone.entity';
import { AddressesModule } from './addresses/addresses.module';
import { AssetsModule } from './assets/assets.module';
import { ChannelsModule } from './channels/channels.module';
import { CollectionsModule } from './collections/collections.module';
import { CountriesModule } from './countries/countries.module';
import { CustomersModule } from './customers/customers.module';
import { FacetsModule } from './facets/facets.module';
import { FulfillmentsModule } from './fulfillments/fulfillments.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { PromotionsModule } from './promotions/promotions.module';
import { RefundsModule } from './refunds/refunds.module';
import { ShippingModule } from './shipping/shipping.module';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import { StoresModule } from './stores/stores.module';
import { SurchargeModule } from './surcharge/surcharge.module';
import { TaxratesModule } from './taxrates/taxrates.module';
import { UsersModule } from './users/users.module';
import { ZonesModule } from './zones/zones.module';
import { PeopleModule } from './people/people.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Person } from './people/entities/people.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
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
        Address,
        Allocation,
        Asset,
        Cancellation,
        Channel,
        Collection,
        CollectionAsset,
        Country,
        Customer,
        CustomerGroup,
        Facet,
        FacetValue,
        Fulfillment,
        Order,
        OrderItem,
        OrderLine,
        OrderModification,
        Payment,
        PaymentMethod,
        Person,
        Product,
        ProductAsset,
        ProductVariant,
        ProductVariantAsset,
        ProductVariantPrice,
        Promotion,
        Refund,
        Release,
        Sale,
        ShippingLine,
        ShippingMethod,
        StockAdjustment,
        StockMovement,
        Store,
        Supplier,
        Surcharge,
        TaxCategory,
        TaxRate,
        User,
        Verification,
        Zone,
      ],
    }),
    AddressesModule,
    AssetsModule,
    CollectionsModule,
    CountriesModule,
    ChannelsModule,
    CustomersModule,
    FacetsModule,
    FulfillmentsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req['user'] }),
      uploads: false,
    }),
    JwtModule.forRoot({
      privateKey: process.env.SECRET_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    OrdersModule,
    PaymentsModule,
    PeopleModule,
    ProductsModule,
    PromotionsModule,
    RefundsModule,
    StockMovementsModule,
    ShippingModule,
    SurchargeModule,
    StoresModule,
    SuppliersModule,
    TaxratesModule,
    UsersModule,
    ZonesModule,
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
