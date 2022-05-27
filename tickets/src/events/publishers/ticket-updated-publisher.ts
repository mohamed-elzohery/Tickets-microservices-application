import {Subjects, TicketUpdatedEvent, Publisher} from '@elzohery/tickets-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated
}