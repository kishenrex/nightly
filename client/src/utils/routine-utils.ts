import { parseRoutine } from "./parse";
import { Routine } from "../pages/CalendarPage";
const port = process.env.PORT || 3001;

export const createTask = async (log: Routine): Promise<Routine> => {
	const response = await fetch(`${port}/calendar`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(log),
	});
	if (!response.ok) {
    	throw new Error("Failed to create sleep log");
	}
	return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
	const response = await fetch(`${port}/calendar`, {
    	method: "DELETE",
	});
	if (!response.ok) {
    	throw new Error("Failed to delete sleep log");
	}
};

export const fetchRoutine = async (id: string): Promise<Routine[]> => {
	const response = await fetch(`${port}/calendar`, {
    	method: "GET",
    	headers: {
        	"Content-Type": "application/json",
    	},
	});
	if (!response.ok) {
    	throw new Error('Failed to fetch sleep logs');
	}

	// Parsing the response to get the data
	let logList = response.json().then((jsonResponse) => {
    	console.log("data in fetchExpenses", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchExpenses", logList);
	return parseRoutine(await logList);
};

export const fetchCalendar = async (email: string): Promise<Routine[]> => {
	const response = await fetch(`${port}/calendar/users/${email}`, {
    	method: "GET",
    	headers: {
        	"Content-Type": "application/json",
    	},
	});
	if (!response.ok) {
    	throw new Error('Failed to fetch calendar');
	}

	// Parsing the response to get the data
	let logList = response.json().then((jsonResponse) => {
    	console.log("data in fetchExpenses", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchExpenses", logList);
	return parseRoutine(await logList);
};