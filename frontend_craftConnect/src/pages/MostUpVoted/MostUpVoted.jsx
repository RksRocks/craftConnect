import { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const MostUpvotedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get("/project/most-upvoted", {
        params: { page, limit: 20 },
      });
      setProjects((prevProjects) => {
        const existingIds = new Set(prevProjects.map((p) => p._id));
        const newProjects = response.data.projects.filter(
          (p) => !existingIds.has(p._id)
        );
        return [...prevProjects, ...newProjects];
      });
      setHasMore(response.data.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  }, [page, hasMore, loading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 100
    )
      return;
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  //   const handleUpVote = (upvotes, projectId) => {
  //     console.log(upvotes, projectId);
  //     setProjects((prevProjects) =>
  //       prevProjects.map((project) =>
  //         project._id === projectId ? { ...project, upvotes: upvotes } : project
  //       )
  //     );
  //     };
  const handleUpVote = (upvotes, projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, upvotes: upvotes } : project
      )
    );
  };

  return (
    <div>
      <h1>Most Upvoted Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            upVote={handleUpVote}
          />
        ))}
      </div>
      {loading && <p>Loading more projects...</p>}
    </div>
  );
};

export default MostUpvotedProjects;
