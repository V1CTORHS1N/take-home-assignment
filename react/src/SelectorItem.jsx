import React from "react";

const SelectorItem = ({ id, type, selectedId, onClick, children }) => {
  // Multiple Selection
  if (type === "horizontal") {
    return (
      <div
        className={`${type}-selector-item ${selectedId === id ? "active" : ""}`}
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
          selectedId.includes(id) ? "active" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  // Single Selection
  /*
  return (
    <div
      className={`${type}-selector-item ${selectedId === id ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
  */
};

export default SelectorItem;
