"use client";

import { useState } from "react";
import { RiRadioButtonFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <>
      <div className=" flex justify-center">
        <button className="border mt-10 rounded-4xl w-100 flex items-center p-4 gap-2 border-primary">
          <SiNaver className=" text-primary text-xl" />
          <div className=" flex gap-x-36">
            <span
              className="text-gray-400"
              onClick={() => setSearchBar((prev) => !prev)}
            >
              검색어를 입력해주세요
            </span>
            <RiRadioButtonFill className="text-2xl text-primary" />
          </div>
        </button>

        {searchBar && (
          <>
            <SearchResult onClose={() => setSearchBar(false)} />
          </>
        )}
      </div>
    </>
  );
};
export default SearchBar;
