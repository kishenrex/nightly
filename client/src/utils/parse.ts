import { Routine, RoutinesMap, TimeMap } from "../pages/CalendarPage";

export const parseRoutine = (input: string): Routine[] => {
    const routine = input.split(';').map(r => {
        const [completed, title, text] = r.split('|');
        return { 
            title: title.trim(), 
            text: text.trim(), 
            completed: completed.trim() === '1'
        };
    });
    return routine;
};