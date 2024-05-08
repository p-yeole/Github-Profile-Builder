import { UserModel } from "./users.model.js";

// Fetch user data from GitHub and save to database
export const getUserDataFromGithub = async (userId) => {
	try {
		// Fetch data from GitHub
		const response = await fetch(`https://api.github.com/users/${userId}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch data from GitHub for user: ${userId}`);
		}

		// Convert the response to JSON
		const userData = await response.json();

		// Create a new user model with the fetched data
		const user = new UserModel(userData);

		// Save the fetched data to the database
		await user.save();
		console.log("GitHub user info saved successfully to the DB!");

		// Return the saved data
		return user;
	} catch (err) {
		console.error("Error:", err);
		throw new Error("Error occurred while saving GitHub-fetched data."); // Throw error to be handled by calling function
	}
};

// Get user data from the database
export const getUserDataFromDB = async (req, res) => {
	const { userId } = req.params; // Ensure consistency with naming

	try {
		// Try to find the user data in the database
		let userInfo = await UserModel.findOne({ login: userId }); // Check by 'login', 'userId', or appropriate field

		if (!userInfo) {
			// If not found, fetch from GitHub and save to DB
			console.log("User info not found in the DB. Fetching from GitHub...");
			userInfo = await getUserDataFromGithub(userId); // Wait for the GitHub fetch and save process
		}

		// Return the user data as JSON
		return res.status(200).json(userInfo);
	} catch (err) {
		console.error("Error fetching user data:", err);
		return res
			.status(500)
			.json({ message: "Error occurred while getting user data." });
	}
};
