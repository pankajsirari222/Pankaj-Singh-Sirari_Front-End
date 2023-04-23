import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item

const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}

      // For calling a function with parameter using on click event, we need to
      //  call it using arrow function.

      onClick={()=> onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired, //isRequired
  isSelected: PropTypes.bool.isRequired,  //isRequired
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component

const WrappedListComponent = ({ items }) => {

// selectedIndex and setSelectedIndex were written in wrong sequence.
//  The convention for useState is to name state variables like 
// [state setState] using array destructuring.

  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    // It will not take null
    setSelectedIndex(-1);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          // === used to compare selectedIndex and index
          isSelected={selectedIndex === index}
          key= {index}  // key prop is used for map function for unique keys
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  // It will be arrayOf instead of shapeOf
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  // It will take empty array not null
  items: [],
};

const List = memo(WrappedListComponent);

export default List;