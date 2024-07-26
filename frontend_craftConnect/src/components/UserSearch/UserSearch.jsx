import { useState, useCallback } from "react";
import axios from "../../api/axios"; // Adjust import according to your setup
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const history = useNavigate();
  const fetchResults = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const response = await axios.get("/user/search", { params: { query } });

        setResults(response.data || []); // Ensure results is always an array
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 700), // Throttle API calls, 300ms delay
    [] // No dependencies, since debounce does not change
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    fetchResults(value);
  };

  return (
    <div className="relative flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users by username or email"
      />

      <ul
        className={`absolute ${
          results.length == 0 && "hidden"
        } top-full text-center text-white w-[400px] bg-[#424242] py-5 px-5`}
      >
        {results && results.length > 0 ? (
          results.map((user) => (
            <li
              onClick={() => {
                setResults([]);
                setQuery("");
                history(`/${user._id}`);
              }}
              key={user._id}
              className="w-full cursor-pointer"
            >
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBox;
