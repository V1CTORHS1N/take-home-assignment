import { useEffect, useState } from "react";
import data from "./data/data";
import Selector from "./Selector";
import Pagination from "./Pagination";

const ITEM_PER_PAGE = 5;

function App() {
  const category = Object.keys(data);
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    setDisplayedData(
      tableData[selectedCategory].slice(
        (currentPage - 1) * ITEM_PER_PAGE,
        currentPage * ITEM_PER_PAGE
      )
    );
  }, [currentPage, tableData, selectedCategory]);

  function handleClickItem(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems((items) => items.filter((item) => item !== id));
    } else {
      // Multiple Selection
      setSelectedItems((items) => [...items, id]);

      // Single Selection
      // setSelectedItems([id]);
    }
  }

  function handleAdd() {
    if (inputValue) {
      tableData[selectedCategory].push(inputValue);
      setTableData((data) => ({
        ...data,
        [selectedCategory]: tableData[selectedCategory],
      }));
      setInputValue("");
      if (displayedData.length === ITEM_PER_PAGE) {
        setCurrentPage(
          Math.ceil(tableData[selectedCategory].length / ITEM_PER_PAGE)
        );
      }
    }
  }

  function handleDelete(e, id) {
    e.stopPropagation();
    setTableData((data) => ({
      ...data,
      [selectedCategory]: tableData[selectedCategory].filter((el) => el !== id),
    }));
    setSelectedItems((items) => items.filter((item) => item !== id));
    if (displayedData.length === 1) {
      setCurrentPage((page) => (page === 1 ? page : page - 1));
    }
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category.split(" ")[1]);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Inventory</h1>

      <div className="category-container">
        <Selector
          selectedItem={selectedCategory}
          handleClick={(category) => {
            handleCategoryClick(category);
          }}
          data={category.map((ele, index) => {
            return { key: index, value: `(${index + 1}) ${ele}` };
          })}
          type="horizontal"
        />
      </div>

      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add item..."
        />

        <button onClick={handleAdd} className="add-button">
          Add
        </button>
      </div>

      <div className="table-container">
        <h2>{`List - Page ${currentPage}/${Math.max(
          Math.ceil(tableData[selectedCategory].length / ITEM_PER_PAGE),
          1
        )} (Total - ${tableData[selectedCategory].length})`}</h2>

        <div className="table-list">
          <Selector
            data={displayedData.map((el, index) => {
              return { key: index, value: el };
            })}
            type="vertical"
            handleClick={handleClickItem}
            selectedItem={selectedItems}
            handleDelete={handleDelete}
          />

          {tableData[selectedCategory].length > ITEM_PER_PAGE && (
            <Pagination
              maxPage={Math.ceil(
                tableData[selectedCategory].length / ITEM_PER_PAGE
              )}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
