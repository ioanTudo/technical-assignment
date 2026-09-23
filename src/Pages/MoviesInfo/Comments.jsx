import { useEffect, useState } from "react";
import { Rating } from "../../Components/Rating/Rating";
import "./MovieInfo.css";

export const Comments = ({ commId }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    try {
      const favMovies =
        JSON.parse(localStorage.getItem(`comments_${commId}`)) || [];
      setComments(favMovies);
    } catch (error) {
      setComments([]);
    }
  }, [commId]);

  const handleAddComm = (id) => {
    if (!comments.find((comm) => comm.id === id)) {
      const updatedList = [...comments, input];
      setComments(updatedList);
      localStorage.setItem(`comments_${commId}`, JSON.stringify(updatedList));
    }
    setInput("");
  };

  return (
    <>
      <h2>Leave a comment</h2>
      <div className="commentGrid_container">
        <div className="commentDisplay_container">
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              padding: "15px",
              gap: "15px",
            }}
          >
            {comments.map((comment, index) => (
              <li style={{ listStyleType: "none" }} key={index}>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid black",
                    borderRadius: "10px",
                  }}
                >
                  User{index}: {comment}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="comment_container">
          <textarea
            placeholder="Your comment"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div className="buttonAndRating_container">
            <button
              className="buttonFav"
              disabled={input.length === 0}
              onClick={handleAddComm}
            >
              add comment
            </button>
            <Rating />
          </div>
        </div>
      </div>
    </>
  );
};
