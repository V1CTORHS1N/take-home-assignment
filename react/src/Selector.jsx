import SelectorItem from "./SelectorItem";

const Selector = ({ selectedId, handleClick, data, type }) => {

  return (
    <div className={`${type}-selector`}>
      {data.map((ele) => (
        <SelectorItem
          key={ele.key}
          id={ele.key}
          selectedId={selectedId}
          type={type}
          onClick={() => handleClick(ele.key)}
        >
          {ele.value}
        </SelectorItem>
      ))}
    </div>
  );
};

export default Selector;
