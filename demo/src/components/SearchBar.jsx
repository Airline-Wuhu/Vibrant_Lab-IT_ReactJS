// search bar component,takes in hook to automaticallu update the search text
import { Input } from "antd";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <Input
      placeholder="Search Text"
      value={searchText}
      allowClear={true}
      onChange={(event) => setSearchText(event.target.value)}
    />
  );
};

export default SearchBar;
