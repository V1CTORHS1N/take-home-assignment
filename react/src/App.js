import { useEffect, useState } from "react";
import Selector from "./Selector";
import Pagination from "./Pagination";
import { useGlobalContext } from "./useContext";

const ITEM_PER_PAGE = 5;

function App() {
  const { data, postDataApi, getDataApi, deleteDataApi } = useGlobalContext();
  const category = ["Fruits"];
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const _getTotalLength = async () => {
      const res = await getDataApi(`/${selectedCategory.toLowerCase()}`);
      setDataLength(res.length);
    };
    _getTotalLength();
  }, [selectedCategory, getDataApi]);

  useEffect(() => {
    const _getData = async () => {
      const response = await getDataApi(
        `/${selectedCategory.toLowerCase()}?limit=${ITEM_PER_PAGE}&page=${currentPage}`
      );
      setDisplayedData(response);
    };
    _getData();
  }, [currentPage, data, selectedCategory, getDataApi, dataLength]);

  async function handleClickItem(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems((items) => items.filter((item) => item !== id));
    } else {
      // Multiple Selection
      setSelectedItems((items) => [...items, id]);

      // Single Selection
      // setSelectedItems([id]);
    }
  }

  async function handleAdd() {
    if (inputValue) {
      const newData = { label: inputValue, value: inputValue };
      await postDataApi(`/${selectedCategory.toLowerCase()}`, newData);
      setDataLength((length) => length + 1);
      setCurrentPage(
        dataLength % ITEM_PER_PAGE === 0
          ? Math.ceil(dataLength / ITEM_PER_PAGE) + 1
          : Math.ceil(dataLength / ITEM_PER_PAGE)
      );
      setInputValue("");
    }
  }

  async function handleDelete(e, id) {
    e.stopPropagation();
    await deleteDataApi(`/${selectedCategory.toLowerCase()}/${id}`);
    setDataLength((length) => length - 1);
    if (displayedData.length === 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
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
            return { id: ele, value: `(${index + 1}) ${ele}` };
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
          Math.ceil(dataLength / ITEM_PER_PAGE),
          1
        )} (Total - ${dataLength})`}</h2>

        <div className="table-list">
          <Selector
            data={displayedData}
            type="vertical"
            handleClick={handleClickItem}
            selectedItem={selectedItems}
            handleDelete={handleDelete}
          />

          {data[selectedCategory]?.length > ITEM_PER_PAGE && (
            <Pagination
              maxPage={Math.max(Math.ceil(dataLength / ITEM_PER_PAGE), 1)}
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
