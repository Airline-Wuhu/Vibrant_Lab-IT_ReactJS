import { Input } from "antd";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <Input
      placeholder="Search Text"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
    />
  );
};

export default SearchBar;
