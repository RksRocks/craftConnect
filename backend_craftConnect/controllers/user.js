import User from "../models/users.js";
import Project from "../models/projects.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch user details

    // Fetch user details
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch portfolios associated with the user
    // const portfolios = await Portfolio.find({ user: userId }).exec();

    // Fetch projects for each portfolio
    // const projectPromises = portfolios.map((portfolio) =>
    const projects = await Project.find({ user: userId }).exec();
    // );
    // const projects = await Promise.all(projectPromises);

    // Flatten the projects array
    const userProjects = projects.flat();

    // Fetch upvotes for each project
    // const upvotePromises = userProjects.map((project) =>
    //   Upvote.countDocuments({ project: project._id }).exec()
    // );
    // const upvoteCounts = await Promise.all(upvotePromises);

    // // Calculate total upvotes
    // const totalUpvotes = upvoteCounts.reduce((sum, count) => sum + count, 0);

    // Send response with user details, projects, and total upvotes
    const totalVotes = userProjects.reduce(
      (accumulator, project) => accumulator + project.upvotes,
      0
    );
    res.json({
      user,
      // portfolios,
      projects: userProjects,
      totalUpvotes: totalVotes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "You are not authorized to update other users profile",
      });
    }
    if (req.body.currentUser !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to edit other users profile",
      });
    }

    const { formData } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (formData.username) user.username = formData.username;
    if (formData.email) user.email = formData.email;
    if (formData.bio) user.bio = formData.bio;
    if (formData.role) user.role = formData.role;

    await user.save();

    res.json({ message: "User details updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
