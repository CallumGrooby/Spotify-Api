import React, { useState } from "react";

const Filters = ({ filterValue, setFilterValue }) => {
  const options = [
    { displayed: "Last Month", option: "short_term" },
    { displayed: "Last 6 Months", option: "medium_term" },
    { displayed: "Last Year", option: "long_term" },
  ];
  const [activeFilter, setActiveFilter] = useState(options[0].option);

  const returnClickedOption = (option) => {
    setActiveFilter(option);
    setFilterValue(option);
  };

  return (
    <section className="container mx-auto my-4">
      <div className="flex flex-col md:flex-row gap-1">
        {options.map((option, index) => (
          <button
            className={
              activeFilter === option.option
                ? "filter-button active"
                : "filter-button"
            }
            key={index}
            onClick={() => returnClickedOption(option.option)}
          >
            {option.displayed}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Filters;
