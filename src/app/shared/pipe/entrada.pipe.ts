import { Entrada } from './../../ticket/enum/entrada.enum';
import { TicketModel } from 'src/app/ticket/models/ticket.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entrada'
})
export class EntradaPipe implements PipeTransform {

  transform(items: Array<TicketModel>): Array<TicketModel> {
    return items.sort((a, b) => (a.type === Entrada.ENTRADA) ? -1 : 1);
  }

}
