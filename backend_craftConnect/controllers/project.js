import Project from "../models/projects.js";
import Comment from "../models/comments.js";
import User from "../models/users.js";
import Upvote from "../models/upvote.js";
import cloudinary from "../services/cloudinary.js";

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
          "user.profileImg": 1,
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
  

    const imageUploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const folderName = "craftconnect"; // Replace with your desired folder name
          const publicId = `${folderName}/${file.originalname}`; // Adjust public ID format as needed
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: folderName,
                public_id: publicId,
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(file.buffer);
        })
    );

    const imageResults = await Promise.allSettled(imageUploadPromises); // Filter out rejected promises (upload errors)

    const successfulUploads = imageResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value); // Validate image data

    if (successfulUploads.length === 0) {
      return res.status(400).json({ message: "Failed to upload images" });
    }

    const OptimizedImg = (ImgUrl) => {
      const baseUrl = ImgUrl.substring(0, ImgUrl.indexOf("/v"));
      const remainingUrl = ImgUrl.substring(ImgUrl.indexOf("/v"));
      return baseUrl + "/q_auto" + remainingUrl;
    };

    const images = successfulUploads.map((result) => ({
      url: OptimizedImg(result.secure_url),
      public_id: result.public_id,
    }));

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
      images,
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
    const { projectId } = req.params;

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
    const { projectId } = req.params;
    // const { id } = req.user;
    const { title, description, link } = req.body;

    // Find the project
    const project = await Project.findById(projectId).populate("user");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    let newImages = [];
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const folderName = "craftconnect"; // Replace with your desired folder name
            const publicId = `${folderName}/${file.originalname}`; // Adjust public ID format as needed
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "auto",
                  folder: folderName,
                  public_id: publicId,
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              )
              .end(file.buffer);
          })
      );

      const imageResults = await Promise.allSettled(imageUploadPromises);
      newImages = imageResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value)
        .map((result) => ({
          url: result.secure_url,
          public_id: result.public_id,
        }));

      // Handle case where no images were uploaded successfully
      if (newImages.length === 0) {
        return res.status(400).json({ message: "Failed to upload any images" });
      }

      // Delete previous images from Cloudinary
      const oldPublicIds = project.images.map((image) => image.public_id);
      await Promise.all(
        oldPublicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
      );
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

    if (newImages.length > 0) {
      project.images = newImages;
    }

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
      "username profileImg"
    );
    const user = await User.findById(project.user._id).select(
      "username role bio profileImg"
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
    const userId = req.user.userId;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingUpvote = await Upvote.findOne({
      user: userId,
      project: projectId,
    });

    if (existingUpvote) {
      // If the user has already upvoted, remove the upvote
      await Upvote.findByIdAndDelete(existingUpvote._id);
      project.upvotes -= 1;
    } else {
      // Otherwise, add a new upvote
      const newUpvote = new Upvote({ user: userId, project: projectId });
      await newUpvote.save();
      project.upvotes += 1;
    }

    await project.save();

    res.json({
      message: existingUpvote
        ? "Upvote removed successfully"
        : "Project upvoted successfully",
      upvotes: project.upvotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUpvoteStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ upvoted: false });
    }

    const { projectId } = req.params;
    const userId = req.user.userId;

    const existingUpvote = await Upvote.findOne({
      user: userId,
      project: projectId,
    });

    res.json({ upvoted: !!existingUpvote });
  } catch (error) {
    console.log(error);
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

    const userr = await User.findById(userId);

    const comment = new Comment({
      user: userId,
      project: projectId,
      content,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment,
      username: userr.username,
      profileImg: userr.profileImg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const mostUpVoted = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const projects = await Project.find({})
      .sort({ upvotes: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    res.json({
      projects,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};
