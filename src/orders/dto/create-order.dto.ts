import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {

  // @IsNumber()
  // @IsPositive()
  // totalAmount: number;
  
  // @IsNumber()
  // @IsPositive()
  // totalItems: number;

  // @IsEnum( OrderStatusList, {
  //   message: `Possible status values are ${OrderStatusList.join(', ')}`,
  // } )
  // @IsOptional()
  // status: OrderStatus = OrderStatus.PENDING;

  // @IsBoolean()
  // @IsOptional()
  // paid: boolean = false;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}
