import { parseRoutine } from "./parse";
import { Routine } from "../pages/CalendarPage";
import { CalendarEntry } from "../types";
const port = process.env.PORT || 3001;

export const createCalendarEntry = async (email: string, entry: CalendarEntry): Promise<void> => {
	const response = await fetch(`http://localhost:${port}/calendar/${email}`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(entry),
	});
	if (!response.ok) {
    	throw new Error("Failed to create entry");
	}
};

export const fetchCalendar = async (email: string, date: string): Promise<CalendarEntry> => {
	const response = await fetch(`http://localhost:${port}/calendar/${email}`, {
    	method: "GET",
    	headers: {
        	"Content-Type": "application/json",
    	},
	});
	if (!response.ok) {
    	throw new Error('Failed to fetch calendar');
	}
	
	const data = await response.json();
	let entry = data.calendar.find((d: CalendarEntry) => d.calendar_day === date);
	if (!entry) {
		entry = {
			id: "",
			email: "",
			calendar_day: "",
			time_start: "",
			time_slept: "",
			checklist: "",
			bedtime: "",}
	}
	return entry;
};

export const editRoutine = async (email: string, date: string, newList: string): Promise<void> => {
	const response = await fetch(`http://localhost:${port}/calendar/${email}`, {
    	method: "PATCH",
		headers: {
        	"Content-Type": "application/json",
    	},
		body: JSON.stringify({ date, newList }),
	});
	if (!response.ok) {
    	throw new Error("Failed to delete sleep log");
	}	
};

// export const createRoutine = async (email: string, rout: string): Promise<Routine> => {
// 	const response = await fetch(`${port}/calendar/${email}`, {
//     	method: "POST",
//     	headers: {
//         	"Content-Type": "application/json",
//     	},
//     	body: JSON.stringify(rout),
// 	});
// 	if (!response.ok) {
//     	throw new Error("Failed to create sleep log");
// 	}
// 	return response.json();
// };

// export const deleteRoutine = async (email: string, date: string): Promise<void> => {
// 	const response = await fetch(`${port}/calendar/${email}`, {
//     	method: "DELETE",
// 		headers: {
//         	"Content-Type": "application/json",
//     	},
// 		body: JSON.stringify(date),
// 	});
// 	if (!response.ok) {
//     	throw new Error("Failed to delete sleep log");
// 	}	
// };

// 	// Parsing the response to get the data
// 	let logList = response.json().then((jsonResponse) => {
//     	console.log("data in fetchExpenses", jsonResponse);
//     	return jsonResponse.data;
// 	});

// 	console.log("response in fetchExpenses", logList);
// 	return parseRoutine(await logList);
// };