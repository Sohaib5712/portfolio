const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, "sjvbsjdhbjavabvhaddabdfjaj", { expiresIn: "2d" });
};

// Function to hash a password
const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

// Function to sign up a user
const signup = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await user.save();

        // Create and send a JWT token
        // const token = createToken(savedUser);
        res.status(201).json(user);
    } catch (error) {
        let errorMessage = "Failed to create user";

        if (error.code === 11000) {
            // Duplicate key error (unique constraint violation)
            errorMessage = "Username is already in use";
            res.status(400).json({ error: errorMessage });
        } else if (error.name === "ValidationError") {
            // Mongoose validation error
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            errorMessage = `Validation error: ${validationErrors.join(", ")}`;
            res.status(400).json({ error: errorMessage });
        } else {
            // Other unexpected errors
            res.status(500).json({ error: errorMessage });
        }
    }
};

// Function to log in a user
const login = async (req, res) => {
    const { user, password } = req.body;
    try {
        // Find the user by username
        const username = await User.findOne({ username: user });

        if (!username) {
            throw new Error("User not found");
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, username.password);

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        // Create and send a JWT token
        const token = createToken(username._id);
        res.status(200).json({ token, user, role: username.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserRecord = async (req, res) => {
    const { user } = req.params;
    const users = await User.findOne({ username: user });
    if (!users) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }
    res.status(200).json({ users });
};

const getAllUserRecords = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching user data" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user item by ID
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user item

        res.json({ message: "user deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params; // Assuming you have a route parameter for the user ID
    const { username, phone, email, gender, role } = req.body;
    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user properties
        user.username = username;
        user.phone = phone;
        user.email = email;
        user.gender = gender;
        user.role = role;

        // Save the updated user data
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update password

// Route to change the user's password
const updatePassword = async (req, res) => {
    const { username } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        // Find the user by their user
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid current password" });
        }
        const hashedPassword = await hashPassword(newPassword);

        // Hash the new password
        user.password = hashedPassword;

        // Save the updated user with the new password
        await user.save();

        res.json({ msg: "Password changed successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    login,
    signup,
    getAllUserRecords,
    deleteUser,
    updateUser,
    getUserRecord,
    updatePassword,
};
