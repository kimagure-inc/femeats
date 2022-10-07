import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ContractsService } from './contracts.service';
import { DeliveryService } from 'src/delivery/delivery.service';

@Injectable()
export class CronService {
  constructor(
    private contractsService: ContractsService,
    private deliveryService: DeliveryService,
  ) {}

  @Cron('0 0 0 * * *')
  async syncdel() {
    console.log('message:cron.log');

    const data = this.contractsService.onContracts();
    (await data).map((i: any) => {
      const order = new Date(i.next_del_date);
      console.log('次回', order);
      const delivery = new Date(i.first_del_date);
      console.log('配送日', delivery);
      const td = new Date();
      console.log(td);
      console.log(
        'レコード',
        i,
        lowerThanDateOnly(td, delivery),
        lowerThanDateOnly(td, order),
      );
      const data = {
        name: String(i.user.name),
        product_id: Number(i.product_id),
        contract_id: Number(i.id),
        deliveryDate: new Date(i.first_del_date),
        address: String(i.user.address1 + i.user.address2 + i.user.address3),
        telPhone: String(i.user.telPhone),
        price: Number(i.product.price),
      };

      if (!lowerThanDateOnly(td, order)) {
        console.log('注文関数');

        const add = order.setDate(
          order.getDate() + 7 * Number(i.product.deliveryCycle),
        );
        const next_oderDay = new Date(add);
        const createdel = this.deliveryService.create(data);
        const upOrderdel = this.contractsService.updateContract({
          where: { id: Number(i.id) },
          data: { next_del_date: next_oderDay },
        });
        return {
          data: createdel,
          data2: upOrderdel,
        };
      }

      if (lowerThanDateOnly(td, delivery) === false) {
        console.log('配送関数');
        const addDay = delivery.setDate(
          delivery.getDate() + 7 * Number(i.product.deliveryCycle),
        );
        const next_delDay = new Date(addDay);
        console.log(next_delDay);
        return this.contractsService.updateContract({
          where: { id: Number(i.id) },
          data: { first_del_date: next_delDay },
        });
      }
    });
  }
}

function lowerThanDateOnly(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth() + 1;
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth() + 1;
  const day2 = date2.getDate();

  if (year1 == year2) {
    if (month1 == month2) {
      return day1 < day2;
    } else {
      return month1 < month2;
    }
  } else {
    return year1 < year2;
  }
}
