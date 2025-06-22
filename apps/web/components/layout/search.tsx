import React from "react";

const inputValue = true;

const SearchBar = () => {
  return (
    <form className="border border-border dark:border-darkmode-border rounded-full flex bg-light/90 dark:bg-dark/10 pl-4 relative">
      <input
        type="text"
        name="search"
        placeholder="Search for products"
        autoComplete="off"
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent p-2 w-full"
      />
      <div className="absolute right-0 top-0 flex h-full items-center">
        {inputValue && (
          <button type="button" className="p-2 m-1 rounded-full">
            {/* <IoClose className="h-4 w-4" /> */}
          </button>
        )}
        <button type="submit" className="search-icon p-2 m-1 rounded-full">
          {/* <IoSearch className="h-5 w-5" /> */}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
