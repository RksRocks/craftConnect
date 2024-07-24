import Rankers from "../../components/Rankers/Rankers";
import ProjectIdeas from "../../components/ProjectIdeas/ProjectIdeas";
import OnGoingHirings from "../../components/OnGoingHirings/OnGoingHirings";
import Headings from "../../components/Headings/Headings";
import { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

function Hero() {
  const [rankers, setRankers] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/project/top-ranked`
      );
      setRankers(response.data);
    } catch (error) {
      console.error("Error fetching top-ranked projects:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="hero pt-24 flex gap-5">
      <div className="hero-left w-[75%]">
        <div className="top-rankers flex flex-col gap-5 w-full mt-4">
          <Headings heading={"Top Rankers"} link={"/top-ranked"} />
          {rankers?.length > 0 ? (
            rankers.map((ranker, index) => (
              <Link key={ranker._id} to={`/${ranker.user._id}`}>
                <Rankers
                  ranker={ranker}
                  // title={ranker.title}
                  // description={ranker.description}
                  // upvotes={ranker.upvotes}
                  // username={ranker.user.username}
                  rank={index + 1}
                />
              </Link>
            ))
          ) : (
            <p>No top rankers available</p>
          )}
        </div>
      </div>
      <div className="hero-right w-[25%]">
        <div className="project-idea flex flex-col gap-5 w-full mt-4">
          <Headings heading={"Project Ideas"} link={"/projects"} />
          <ProjectIdeas />
          <ProjectIdeas />
          <ProjectIdeas />
        </div>
        <div className="ongoing-hiring flex flex-col w-full mt-4">
          <Headings heading={"On Going Hiring"} link={"/hiring"} />
          <OnGoingHirings />
          <OnGoingHirings />
          <OnGoingHirings />
          <OnGoingHirings />
          <OnGoingHirings />
        </div>
      </div>
    </div>
  );
}

export default Hero;
