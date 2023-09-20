import { useEffect, useState } from "react";
import "./App.css";
import Comments from "./components/comments/Comments";
import Items from "./components/items/Items";

const App = () => {
  const [items, setItems] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    localStorage.getItem("items") ? setItems(JSON.parse(localStorage.getItem("items"))) : localStorage.getItem("");
  }, []);

  useEffect(() => {
    if (isRender) {
      localStorage.setItem("items", JSON.stringify(items));
      setIsRender(false);
    }
  }, [items, isRender]);

  return (
    <div className="wrapper">
      <div className="dairy">
        <span>DAYRY APP</span>
        <span>Comment whit no sense</span>
      </div>
      <div className="comp-wrapper">
        <Items
          items={items}
          setItems={setItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setIsRender={setIsRender}
        />
        <Comments
          items={items.length === 0 ? [] : items}
          activeItem={activeItem}
          setItems={setItems}
          setIsRender={setIsRender}
        />
      </div>
    </div>
  );
};

export default App;
