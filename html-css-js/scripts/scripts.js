const data = {
  Vegetables: ["Carrot", "Cucumber"],
  Spices: ["Salt", "Pepper", "Chilli", "Herbs", "Curry"],
  Fruits: [
    "Apple",
    "Banana",
    "Orange",
    "Pear",
    "Watermelon",
    "Grape",
    "Strawberry",
    "Mango",
    "Blackberry",
  ],
};

const category = Object.keys(data);

let activeCategory = category[0];

category.map((item, index) => {
  const div = document.createElement("div");
  div.classList.add(item);
  div.innerHTML = `(${index + 1}) ${item}`;
  div.addEventListener("click", (e) => {
    e.target.classList.add("active");
    category.map((cat) => {
      if (cat !== item) {
        document.querySelector(`.${cat}`).classList.remove("active");
      }
    });

    const categoryData = data[item];

    const titleContainer = document.getElementById("list-title");
    titleContainer.innerHTML = `List (${categoryData.length})`;
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML = "";

    categoryData.map((item) => {
      const div = document.createElement("div");
      div.innerHTML = item;
      div.classList.add("item");

      // Multiple Selection
      div.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
      });

      // Single Selection
      // div.classList.add(item);
      // div.addEventListener("click", (e) => {
      //   e.target.classList.toggle("active");
      //   categoryData.map((catd) => {
      //     if (catd !== item) {
      //       document.querySelector(`.${catd}`).classList.remove("active");
      //     }
      //   });
      // });

      itemContainer.appendChild(div);
    });
  });

  document.getElementById("category-container").appendChild(div);
});

document.querySelector(`.${activeCategory}`).click();
