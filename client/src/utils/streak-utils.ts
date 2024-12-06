const port = process.env.PORT || 3001;

export const sendStreaks = async (email: string, current_streak: number, max_streak: number): Promise<void> => {
	const response = await fetch(`http://localhost:${port}/users/${email}`, {
    	method: "PATCH",
		headers: {
        	"Content-Type": "application/json",
    	},
		body: JSON.stringify({ current_streak, max_streak }),
	});
	if (!response.ok) {
    	throw new Error("Failed to set streak");
	}	
};
