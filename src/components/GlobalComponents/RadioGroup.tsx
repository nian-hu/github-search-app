import React from "react";

export interface RadioGroupProps {
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentSelected: string;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { options, onChange, currentSelected } = props;

  return (
    <div className="flex flex-row items-center m-2">
      {options.map((option, idx) => (
        <div className="flex flex-row items-center m-2" key={idx}>
          <input
            type="radio"
            value={option}
            checked={currentSelected === option}
            onChange={onChange}
            id={option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
