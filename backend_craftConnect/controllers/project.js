import Project from "../models/projects.js";
import Comment from "../models/comments.js";
import User from "../models/users.js";

export const getTopRankedProjects = async (req, res) => {
  try {
    // Aggregate the total upvotes for each project
    const topProjects = await Project.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { upvotes: -1 }, // Sort by upvotes in descending order
      },
      {
        $limit: 5, // Limit to top 5
      },
      {
        $project: {
          title: 1,
          description: 1,
          link: 1,
          upvotes: 1,
          created_at: 1,
          "user.username": 1,
          "user.email": 1,
          "user.bio": 1,
          "user.role": 1,
          "user._id": 1,
        },
      },
    ]);

    res.status(200).json(topProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { userId, title, description, link } = req.body;
    if (userId !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to add project on others profile",
      });
    }
    // Ensure the portfolio belongs to the user
    // const portfolio = await Portfolio.findOne({
    //   _id: portfolioId,
    //   user: userId,
    // });
    // if (!portfolio) {
    //   return res.status(404).json({
    //     message: "Portfolio not found or does not belong to the user",
    //   });
    // }

    // Create a new project
    const newProject = new Project({
      user: userId,
      title,
      description,
      link,
    });

    // Save the project
    await newProject.save();

    res
      .status(201)
      .json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id, projectId } = req.params;

    // const { id } = req.body;

    // Find the project
    const project = await Project.findById(projectId).populate("user");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the user is the owner of the project

    if (project.user._id.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this project",
      });
    }

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id, projectId } = req.params;
    // const { id } = req.user;
    const { title, description, link } = req.body;

    // Find the project
    const project = await Project.findById(projectId).populate("user");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the user is the owner of the project

    if (project.user._id.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this project" });
    }

    // Update project details
    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project
    const project = await Project.findById(projectId).populate(
      "user",
      "username"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Get comments and user details
    const comments = await Comment.find({ project: projectId }).populate(
      "user",
      "username"
    );
    const user = await User.findById(project.user._id).select(
      "username role bio"
    );

    res.status(200).json({ project, comments, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const upvoteProject = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "You are not authorized to upvote until you login" });
    }
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.upvotes += 1;
    await project.save();

    res.json({
      message: "Project upvoted successfully",
      upvotes: project.upvotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "You are not authorized to upvote until you login" });
    }
    const { projectId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const comment = new Comment({
      user: userId,
      project: projectId,
      content,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
