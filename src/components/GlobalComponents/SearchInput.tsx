import React from "react";

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onPressEnter: () => void;
  placeholder: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { value, onChange, onSubmit, onPressEnter, placeholder } = props;

  return (
    <div
      className="flex flex-col w-full items-center m-2"
      data-testid="searchInput"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-1/2 p-5 rounded-2xl border border-gray-400 text-gray-500 hover:shadow focus:outline-none focus:shadow-xl"
        value={value}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onPressEnter();
          }
        }}
      />
      <button
        onClick={onSubmit}
        className="cursor-pointer hover:opacity-50 rounded-2xl w-1/5 mt-5 p-3 flex flex-row items-center justify-center shadow-md bg-indigo-400 text-black"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
