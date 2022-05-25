import {Subjects, TicketCreatedEvent, Publisher} from '@elzohery/tickets-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}