import { useEffect, useRef, useState } from "react";
import "./Items.css";

const Items = ({ items, setItems, activeItem, setActiveItem, setIsRender }) => {
  const inputRef = useRef(null);
  const itemsRef = useRef(null);

  const addItem = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length > 0) {
      setIsRender(true);
      setItems((prev) => [
        ...prev,
        { name: inputRef.current.value, comments: [], commentsNumber: Math.round(Math.random() * 100000000 - 1) },
      ]);
    }
  };

  const deleteItem = (id) => {
    setActiveItem(items.length - 2);
    setIsRender(true);
    setItems((prev) => prev.filter((item, innerId) => innerId !== id));
  };

  const activate = (id, e) => {
    Array.from(itemsRef.current.children).forEach((item) => item.classList.remove("active"));
    document.querySelector(`.items-wrapper>div:nth-child(${id + 1})`)?.classList.add("active");
    if (e.target.classList.contains("delete-btn")) {
      return;
    }
    setActiveItem(id);
  };

  useEffect(() => {
    Array.from(itemsRef.current.children).forEach((item) => item.classList.remove("active"));
    document.querySelector(`.items-wrapper>div:nth-child(${activeItem + 1})`)?.classList.add("active");
  }, [activeItem]);

  const itemsRender = ({ name, comments }, id) => (
    <div className="item" key={id} onClick={(e) => activate(id, e)}>
      <span className="item-name">{name}</span>
      <div className="quantity-btn-wrapper">
        <span className="item-commentQuantity">{comments.length}</span>
        <div className="delete-btn" onClick={() => deleteItem(id)}>
          Delete
        </div>
      </div>
    </div>
  );

  return (
    <div className="items">
      <span className="title">Items</span>
      <form className="input-wrapper">
        <input type="text" className="search" placeholder="Type name here..." ref={inputRef} required />
        <input type="submit" className="add-btn" value="Add New" onClick={(e) => addItem(e)} />
      </form>

      <div className="items-wrapper" ref={itemsRef}>
        {items.map(itemsRender)}
      </div>
    </div>
  );
};

export default Items;
