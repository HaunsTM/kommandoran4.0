import ICalendarEvent from '@/interfaces/iCalendarEvent';

export default interface ICalendar {
    name: string;
    entity_id: string;
    url: string;
    
    events: Array<ICalendarEvent>;
}
