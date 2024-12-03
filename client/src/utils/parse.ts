import { Routine, RoutinesMap, TimeMap } from "../pages/CalendarPage";
import { CalendarEntry } from "../types";

export const parseRoutine = (input: string): Routine[] => {
    const routine = input.split(";").map(r => {
        const [completed, title, text] = r.split("|");
        return { 
            title: title, 
            text: text, 
            completed: completed === "1"
        };
    });
    return routine;
};

export const stringifyRoutine = (input: Routine[]): string => {
    console.log("routines: ", input);
    return input.map(({ title, text, completed }) => 
            `${completed ? "1" : "0"}|${title}|${text}`
    ).join(";");
};