import { useRef } from "react";
import "./Comments.css";

const Comments = ({ items, activeItem, setItems, setIsRender }) => {
  const textRef = useRef(null);
  const inputColorRef = useRef(null);

  const addComment = (e) => {
    e.preventDefault();
    if (textRef.current.value.length === 0) {
      return;
    }
    const temp = [...items];
    temp[activeItem].comments = [
      ...temp[activeItem].comments,
      { text: textRef.current.value, color: inputColorRef.current.value },
    ];
    textRef.current.value = "";
    setIsRender(true);
    setItems([...temp]);
  };

  const commentsRender = ({ color, text }, id) => (
    <div className={"comment"} key={id}>
      <div className="color-block" style={{ background: color }}></div>
      <div className="text">{text}</div>
    </div>
  );

  return (
    <div className="comments">
      <span className="title">Comments #{items.length === 0 ? false : items[activeItem].commentsNumber}</span>
      <div className="comments-wrapper">
        {items.length === 0 ? false : items[activeItem].comments.map(commentsRender)}
      </div>
      <form className="input-wrapper">
        <input type="color" name="color" id="color" className="colorInput" ref={inputColorRef} />
        <textarea className="search" placeholder="Type comment here..." ref={textRef} required />
        <input type="submit" className="add-comment-btn" value="Add New" onClick={(e) => addComment(e)} />
      </form>
    </div>
  );
};

export default Comments;
