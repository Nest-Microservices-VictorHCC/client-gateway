import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus,  OrderStatusList, } from "../enum/order.enum";
import { PaginationDto } from "src/common";

export class orderPaginationDto extends PaginationDto {

  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus
}