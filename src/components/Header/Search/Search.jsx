import { IoMdSearch } from "react-icons/io";

import "./Search.css";

const Search = () => {
  return (
    <div className="search-container">
      <IoMdSearch id="search-icon" />
      <input type="text" id="search-input" />
    </div>
  );
};

export default Search;
