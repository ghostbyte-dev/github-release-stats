interface SearchBarProps {
  value: string;
  onChange: (e: string) => void;
  onSubmit: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <>
      <input
        type="text"
        id="simple-search"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <button type="button" className="cursor-pointer" onClick={props.onSubmit}>
        Search
      </button>
    </>
  );
};

export default SearchBar;
