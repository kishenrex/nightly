export interface User {
    email: string;
    username: string;
    password: string;
    calendar_table: string;
    avatar: string;
    streak: number;
}

export interface CalendarEntry {
    id: string;
    email: string;
    calendar_day: string;
    time_start: string;
    time_end: string;
    time_slept: string;
    checklist: string;
    desired_bedtime: string;
    desired_reminder_time: string;
}