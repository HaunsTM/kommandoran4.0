export default interface ICalendarEvent {
    start: Date;
    end: Date;
    summary: string;
    description: string | null;
    location: string | null;
}