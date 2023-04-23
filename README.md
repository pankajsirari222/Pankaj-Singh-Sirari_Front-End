
# Steeleye Assignment




### Q1. Explain what the simple List component does.

- It takes an array of items as a prop and displays them as a list. 
- Each item in the list is displayed as a SingleListItem component, which is a child component of the List component.
-  The SingleListItem component takes props such as index, isSelected, onClickHandler, and text to display the list item and handle click events.
- The List component uses the useState and useEffect hooks from React to manage the selected index state of the list item. The selectedIndex state is used to determine which list item is currently selected, and it is updated when the user clicks on an item in the list.
- The useEffect hook is used to reset the selected index state to -1 whenever the items array prop is updated.

- The List component also uses PropTypes to validate the props passed to it. 
- It expects an array of items with each item having a text property of type string. If no items are passed to the List component, it defaults to an empty array.
- Finally, the List component is wrapped in the memo HOC to optimize its rendering performance.


## Q2. What problems / warnings are there with code?

1.  For calling a function with parameter using on click event, we need to call it using arrow function but here it is called directly.
So, instead of ```onClick={onClickHandler(index)}```
It will be ```onClick={()=> onClickHandler(index)}```

2. index and isSelected should be required for proper functioning of WrappedSingleListItem. So, it is changed to: -
  ```index: PropTypes.number.isRequired``` and  ``` isSelected: PropTypes.bool.isRequired```.

3. selectedIndex and setSelectedIndex are written in wrong sequence. The convention for useState is to name state variables like [state setState] using array destructuring. Also, selectedIndex will be initialised to -1 as it will take integer values starting from 0. So, updated code will be like this: -
```javascript
const [selectedIndex, setSelectedIndex] = useState(-1);
```
```javascript
useEffect(() => {
setSelectedIndex(-1);
  }, [items]);
  ```

4. Here, === should be used to compare selectedIndex and index.
 ```isSelected={selectedIndex === index}```

5. For map functions, unique key props are required otherwise it will give warning. To prevent that: - 
```key= {index}``` is used inside map function

6. Instead of shapeOf,it will be ```PropTypes.shape``` and also, ```PropTypes.arrayOf``` will be used.

```javascript
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  )
  ```

7. Default prop for items will be [] i.e. empty array instead of null.
```javascript
WrappedListComponent.defaultProps = {
  items: [],
};
```


## Q3. Please fix, optimize, and/or modify the component as much as you think is necessary.
## Code: -

```javascript
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

          // key prop is used for map function for unique keys
          key= {index}  
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
```