import { useState } from "react";
import "./App.css";
import data from "./data/data";
import Selector from "./Selector";

function App() {
  const category = Object.keys(data);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);

  function handleClickItem(id) {
    setSelectedItemId(id === selectedItemId ? null : id);
  }

  function handleCategoryClick(id) {
    setSelectedCategoryId(id);
  }

  return (
    <div className="container">
      <h1>Inventory</h1>
      <div className="category-container">
        <Selector
          selectedId={selectedCategoryId}
          handleClick={(id) => {
            handleCategoryClick(id);
            setSelectedItemId(null);
          }}
          data={Object.keys(data).map((ele, index) => {
            return { key: index, value: `(${index + 1}) ${ele}` };
          })}
          type="horizontal"
        />
      </div>
      <div className="table-container">
        <h2>{`List (${data[category[selectedCategoryId]].length})`}</h2>
        <div className="table-list">
          <Selector
            data={data[category[selectedCategoryId]].map((el, index) => {
              return { key: index, value: el };
            })}
            type="vertical"
            handleClick={handleClickItem}
            selectedId={selectedItemId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
