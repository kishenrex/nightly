import { SleepLog } from "../types";
import { parseRoutine } from "./parse";
const port = 3001;

export const createSleepLog = async (log: SleepLog): Promise<SleepLog> => {
	const response = await fetch(`${port}/sleep-log`, {
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

export const deleteSleepLog = async (id: string): Promise<void> => {
	const response = await fetch(`${port}/sleep-log`, {
    	method: "DELETE",
	});
	if (!response.ok) {
    	throw new Error("Failed to delete sleep log");
	}
};

export const fetchSleepLog = async (): Promise<SleepLog[]> => {
	const response = await fetch(`${port}/sleep-log`);
	if (!response.ok) {
    	throw new Error('Failed to fetch sleep logs');
	}

	// Parsing the response to get the data
	let logList = response.json().then((jsonResponse) => {
    	console.log("data in fetchExpenses", jsonResponse);
    	return jsonResponse.data;
	});

	console.log("response in fetchExpenses", logList);
	return logList;
};