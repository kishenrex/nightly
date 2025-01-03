export interface User {
    email: string;
    username: string;
    password: string;
    calendar_table: string;
    avatar: string;
    theme: string;
    currentStreak: string;
    maxStreak: string;
}

export interface CalendarEntry {
    id: string;
    email: string;
    calendar_day: string;
    time_start: string;
    time_slept: string;
    checklist: string;
    bedtime: string;
}