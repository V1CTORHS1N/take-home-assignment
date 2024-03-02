import React from "react";

const SelectorItem = ({
  id,
  type,
  selectedItem,
  onClick,
  handleDelete,
  children,
}) => {
  if (type === "horizontal") {
    return (
      <div
        className={`${type}-selector-item ${
          selectedItem === children.split(" ")[1] ? "active" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  if (type === "vertical") {
    return (
      <div
        className={`${type}-selector-item ${
          selectedItem.includes(id) ? "active" : ""
        }`}
        onClick={onClick}
      >
        {children}
        <button className="trash-button" onClick={(e) => handleDelete(e, id)}>
          🗑️
        </button>
      </div>
    );
  }
};

export default SelectorItem;
