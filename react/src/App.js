import { useState } from "react";
import data from "./data/data";
import Selector from "./Selector";

function App() {
  const category = Object.keys(data);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  // Multiple Selection
  const [selectedItemId, setSelectedItemId] = useState([]);
  // Single Selection
  // const [selectedItemId, setSelectedItemId] = useState(null);
  const selectedData = data[category[selectedCategoryId]];

  function handleClickItem(id) {
    // Multiple Selection
    if (selectedItemId.includes(id)) {
      setSelectedItemId((items) => items.filter((item) => item !== id));
    } else {
      setSelectedItemId((items) => [...items, id]);
    }

    // Single Selection
    // setSelectedItemId(id === selectedItemId ? null : id);
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
            // Multiple Selection
            setSelectedItemId([]);
            // Single Selection
            // setSelectedItemId(null);
          }}
          data={category.map((ele, index) => {
            return { key: index, value: `(${index + 1}) ${ele}` };
          })}
          type="horizontal"
        />
      </div>
      <div className="table-container">
        <h2>{`List (${selectedData.length})`}</h2>
        <div className="table-list">
          <Selector
            data={selectedData.map((el, index) => {
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
