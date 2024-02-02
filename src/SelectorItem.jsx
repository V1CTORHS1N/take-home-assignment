import React from "react";

const SelectorItem = ({ id, type, selectedId, onClick, children }) => {
  console.log(id, selectedId);
  return (
    <div
      className={`${type}-selector-item ${selectedId === id ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SelectorItem;
