import SelectorItem from "./SelectorItem";

const Selector = ({ selectedItem, handleClick, data, type, handleDelete }) => {
  return (
    <div className={`${type}-selector`}>
      {data.length > 0 ? (
        data.map((ele) => (
          <SelectorItem
            key={ele.value}
            id={ele.value}
            selectedItem={selectedItem}
            type={type}
            onClick={() => handleClick(ele.value)}
            handleDelete={handleDelete}
          >
            {ele.value}
          </SelectorItem>
        ))
      ) : (
        <div>
          <h3>No data</h3>
        </div>
      )}
    </div>
  );
};

export default Selector;
