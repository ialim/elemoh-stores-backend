import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelsService } from 'src/core/channels/channels.service';
import { UsersService } from 'src/core/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { DeleteOrderInput, DeleteOrderOutput } from './dtos/delete-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { AllOrderOutput } from './dtos/find-all-orders.dto';
import { FindOrderInput, FindOrderOutput } from './dtos/find-order.dto';
import { Purchase } from './entities/order-purchase.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly channelsService: ChannelsService,
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(Purchase)
    private readonly purchases: Repository<Purchase>,
  ) {}

  /** Order Services */
  async createOrder({
    channelId,
    userId,
    code,
    ...restArgs
  }: CreateOrderInput): Promise<CreateOrderOutput> {
    try {
      const order = await this.orders.findOne({ code });

      if (!order) {
        const userResult = await this.usersService.findById(userId);
        const channelResult = await this.channelsService.findById({
          channelId,
        });

        if (!userResult.ok && !channelResult.ok) {
          return {
            ok: false,
            error: userResult.error || channelResult.error,
          };
        }

        await this.orders.save(
          this.orders.create({
            user: userResult.user,
            channels: [channelResult.channel],
            code,
            ...restArgs,
          }),
        );

        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Order already exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editOrder({
    orderId,
    ...restArgs
  }: EditOrderInput): Promise<EditOrderOutput> {
    try {
      const order = await this.orders.findOne({ id: orderId });
      if (!order) {
        return {
          ok: false,
          error: 'Order not found',
        };
      }
      const {
        currencyCode,
        channelId,
        shipping,
        shippingAddress,
        shippingWithTax,
        state,
        totalCost,
        totalDiscount,
        totalQuantity,
        totalTax,
        active,
        billingAddress,
        taxZoneId,
        userId,
      } = restArgs;

      currencyCode && (order.currencyCode = currencyCode);
      shipping && (order.shipping = shipping);
      shippingAddress && (order.shippingAddress = shippingAddress);
      shippingWithTax && (order.shippingWithTax = shippingWithTax);
      state && (order.state = state);
      totalCost && (order.totalCost = totalCost);
      totalDiscount && (order.totalDiscount = totalDiscount);
      totalQuantity && (order.totalQuantity = totalQuantity);
      totalTax && (order.totalTax = totalTax);
      active && (order.active = active);
      billingAddress && (order.billingAddress = billingAddress);
      taxZoneId && (order.taxZoneId = order.taxZoneId);

      if (channelId) {
        const channelResult = await this.channelsService.findById({
          channelId,
        });
        channelResult.ok &&
          !order.channels.includes(channelResult.channel) &&
          (order.channels = [...order.channels, channelResult.channel]);
      }

      await this.orders.save(order);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteOrder({ orderId }: DeleteOrderInput): Promise<DeleteOrderOutput> {
    try {
      const order = await this.orders.findOne({ id: orderId });
      if (!order) {
        return {
          ok: false,
          error: 'Order not found',
        };
      }
      await this.orders.remove(order);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findOrder({ orderId }: FindOrderInput): Promise<FindOrderOutput> {
    try {
      const order = await this.orders.findOne({ id: orderId });
      if (!order) {
        return {
          ok: false,
          error: 'Order not found',
        };
      }
      return {
        ok: true,
        order,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllOrder(): Promise<AllOrderOutput> {
    try {
      const orders = await this.orders.find();
      if (!orders) {
        return {
          ok: false,
          error: 'Orders not found',
        };
      }
      return {
        ok: true,
        orders,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
