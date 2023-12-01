import { Address } from 'src/core/addresses/entities/address.entity';
import { Asset } from 'src/core/assets/entities/asset.entity';
import { Channel } from 'src/core/channels/entities/channel.entity';
import { CollectionAsset } from 'src/core/collections/entities/collection-asset.entity';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Country } from 'src/core/countries/entities/country.entity';
import { CustomerGroup } from 'src/core/customers/entities/customer-group.etity';
import { Customer } from 'src/core/customers/entities/customer.entity';
import { Department } from 'src/core/employees/entities/department.entity';
import { Employee } from 'src/core/employees/entities/employee.entity';
import { FacetValue } from 'src/core/facets/entities/facet-value.entity';
import { Facet } from 'src/core/facets/entities/facet.entity';
import { Fulfillment } from 'src/core/fulfillments/entities/fulfillment.entity';
import { OrderItem } from 'src/core/orders/entities/order-item.entity';
import { OrderLine } from 'src/core/orders/entities/order-line.entity';
import { OrderModification } from 'src/core/orders/entities/order-modification.entity';
import { Purchase } from 'src/core/orders/entities/order-purchase.entity';
import { Sale } from 'src/core/orders/entities/order-sale.entity';
import { Order } from 'src/core/orders/entities/order.entity';
import { PaymentMethod } from 'src/core/payments/entities/payment-method.entity';
import { Payment } from 'src/core/payments/entities/payment.entity';
import { Person } from 'src/core/people/entities/people.entity';
import { ProductAsset } from 'src/core/products/entities/product-asset.entity';
import { ProductVariantAsset } from 'src/core/products/entities/product-variant-asset.entity';
import { ProductVariantPrice } from 'src/core/products/entities/product-variant-price.entity';
import { ProductVariant } from 'src/core/products/entities/product-variant.entity';
import { Product } from 'src/core/products/entities/product.entity';
import { Promotion } from 'src/core/promotions/entities/promotion.entity';
import { Refund } from 'src/core/refunds/entities/refund.entity';
import { Permission } from 'src/core/role/entities/permission.entity';
import { Role } from 'src/core/role/entities/role.entity';
import { ShippingLine } from 'src/core/shipping/entities/shipping-line.entity';
import { ShippingMethod } from 'src/core/shipping/entities/shipping-method.entity';
import { StockAdjustment } from 'src/core/stock-movements/entities/stock-adjustment.entity';
import { StockAllocation } from 'src/core/stock-movements/entities/stock-allocation.entity';
import { StockCancellation } from 'src/core/stock-movements/entities/stock-cancellation.entity';
import { StockMovement } from 'src/core/stock-movements/entities/stock-movement.entity';
import { StockPurchase } from 'src/core/stock-movements/entities/stock-purchase.entity';
import { StockRelease } from 'src/core/stock-movements/entities/stock-release.entity';
import { StockSale } from 'src/core/stock-movements/entities/stock-sale.entity';
import { StoreStockLevel } from 'src/core/stores/entities/store-stock-level.entity';
import { Store } from 'src/core/stores/entities/store.entity';
import { Supplier } from 'src/core/suppliers/entities/supplier.entity';
import { Surcharge } from 'src/core/surcharge/entities/surcharge.entity';
import { TaxCategory } from 'src/core/taxrates/entities/tax-category.entity';
import { TaxRate } from 'src/core/taxrates/entities/tax-rate.entity';
import { User } from 'src/core/users/entities/user.entity';
import { Verification } from 'src/core/users/entities/verification.entity';
import { Zone } from 'src/core/zones/entities/zone.entity';

export const coerEntities = [
  Address,
  StockAllocation,
  Asset,
  StockCancellation,
  Channel,
  Collection,
  CollectionAsset,
  Country,
  Customer,
  CustomerGroup,
  Employee,
  Department,
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
  Permission,
  Product,
  ProductAsset,
  ProductVariant,
  ProductVariantAsset,
  ProductVariantPrice,
  Promotion,
  Purchase,
  Refund,
  Role,
  Sale,
  StockPurchase,
  StockRelease,
  StockSale,
  ShippingLine,
  ShippingMethod,
  StockAdjustment,
  StockMovement,
  Store,
  StoreStockLevel,
  Supplier,
  Surcharge,
  TaxCategory,
  TaxRate,
  User,
  Verification,
  Zone,
];
