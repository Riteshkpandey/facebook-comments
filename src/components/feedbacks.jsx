import React, { useState } from "react";
import data from "../constant/data";
import { v4 as uuidv4 } from "uuid";

const Feedback = () => {
  const [res, setres] = useState([...data]);
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState(null);
  const [reply, setReply] = useState(null);

  const increaseReply = (id) => {
    const item = res.filter((val) => val.id === id);
    item[0].likes_count = item[0].likes_count + 1;
    const newVal = [...res];
    newVal[id] = item[0];
    setres(newVal);
  };
  const toHandleComment = () => {
    const val = {
      id: uuidv4(),
      comment: comment,
      likes_count: 0,
      reply: [],
    };
    setres([...res, val]);
  };

  const toHandleReply = (id) => {
    setReplyComment(id);
  };

  const handleReply = (id) => {
    const item = res.filter((val) => val.id === id);
    item[0].reply.push({
      id: uuidv4(),
      comment: reply,
      likes_count: 0,
      reply: [],
    });
    const newReply = [...res];
    setReply("");
    newReply[id] = item[0];
    console.log(newReply);
    setres(newReply);
    setReplyComment(null);
  };

  return (
    <div>
      <input type="textarea" onChange={(e) => setComment(e.target.value)} />
      <button onClick={() => toHandleComment()}>Comment</button>
      {res?.map((item) => (
        <div key={item.id}>
          <div>{item.comment}</div>
          <div>
            <span onClick={() => increaseReply(item.id)}>
              Like {item.likes_count}
            </span>
            <span onClick={() => toHandleReply(item.id)}>reply</span>
            {replyComment === item.id && (
              <div>
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button onClick={() => handleReply(item.id)}>reply</button>
              </div>
            )}
            {item.reply.length > 0 && (
              <div
                style={{
                  display: "flex",
                  border: "1px solid black",
                  flexDirection: "column",
                }}
              >
                {item.reply.map((res) => (
                  <div key={res.id}>
                    {res.comment}
                    <div>{res.likes_count}</div>
                    <div>{res.reply}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
