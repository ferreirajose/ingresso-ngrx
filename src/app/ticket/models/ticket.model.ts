import { Ticket } from '../interface/ticket.interface';

export class TicketModel {
  public description: string;
  public price: string | number;
  public type: string;
  public uid?: string;

  constructor({description , price, type, uid}: Ticket) {
    this.description = description;
    this.price = price;
    this.type = type;
    this.uid = uid;
  }

}
