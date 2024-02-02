import { useState } from "react";
import "./App.css";
import data from "./data/data";

function App() {
  const category = Object.keys(data);
  const [clickCategoryId, setClickCategoryId] = useState(0);
  const [clickItemId, setClickItemId] = useState(null);

  function handleClickCategory(id) {
    setClickCategoryId(id);
  }

  function handleClickItem(id) {
    setClickItemId(id === clickItemId ? null : id);
  }

  return (
    <div className="container">
      <h1>Inventory</h1>
      <div className="category-container">
        {Object.keys(data).map((el, index) => (
          <div
            key={index}
            onClick={() => {
              handleClickCategory(index);
              setClickItemId(null);
            }}
            className={`header ${index === clickCategoryId ? "active" : ""}`}
          >{`(${index + 1}) ${el}`}</div>
        ))}
      </div>
      <div className="table-container">
        <h2>{`List (${data[category[clickCategoryId]].length})`}</h2>
        <div className="unorder-list">
          <ul>
            {data[category[clickCategoryId]].map((el, index) => (
              <li
                key={index}
                onClick={() => handleClickItem(index)}
                className={`${index === clickItemId ? "active" : ""}`}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
