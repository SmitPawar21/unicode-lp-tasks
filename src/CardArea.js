import { useState, useEffect } from "react";
import like from "./images/like.svg";
import dislike from "./images/dislike.svg";
import edit from "./images/edit.svg";
import deleteImg from "./images/delete.svg";
import axios from "axios";
import save from "./images/save.svg";

export const CardArea = () => {
  const [postArray, setPostArray] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPostArray(data.posts);
      })

  }, [])

  console.log(postArray);

  const delete_card = async (id) => {

    try {
      const res = await axios.delete(`https://dummyjson.com/posts/${id}`);
      setPostArray(postArray.filter(post => post.id !== id));
    }
    catch (err) {
      console.error(err);
    }

  }

  const edit_card = (id) => {
    
    const edit_but = document.querySelectorAll(".edit_but");
    const save_but = document.querySelectorAll(".save_but");
    
    edit_but[id - 1].style.display = "none";
    save_but[id - 1].style.display = "block";
    
    const textarea_editable = document.querySelectorAll(".textarea");
    const textarea = document.querySelectorAll("textarea");
    
    textarea_editable[id-1].contentEditable = "true";
    textarea[id - 1].style.display = "none";
    textarea_editable[id - 1].style.display = "flex";
  }

  const save_card = (id) => {

    const textarea_editable = document.querySelectorAll(".textarea");

    const post_body = textarea_editable[id-1].value;

    const edit_but = document.querySelectorAll(".edit_but");
    const save_but = document.querySelectorAll(".save_but");

    edit_but[id - 1].style.display = "block";
    save_but[id - 1].style.display = "none";

    textarea_editable[id-1].contentEditable = "false";

    try {
      fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({body: post_body})
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
    } catch (err) {
      console.error(err);
    }
  }

return (
  <div className='card_area'>
    {/* <h1 className="label"> post gallery </h1> */}
    <ul className="card_block">
      {
        postArray.map((post, key) => {

          return (
            <li className="card" key={post.id}>
              <div className="user_info">
                <span></span>
                <h3> user id: {post.userId}</h3>
              </div>
              <h1 className="title"> {post.title} </h1>

              <div contentEditable='true' className="textarea">{post.body}</div>
              <textarea value={post.body} />

              <h3>
                {post.views} views
              </h3>

              <div className="reactions">
                <span>
                  <img src={like} />
                  {post.reactions.likes}
                </span>
                <span>
                  <img src={dislike} />
                  {post.reactions.dislikes}
                </span>
                <button className="edit_but" onClick={() => edit_card(post.id)}><img src={edit} /></button>
                <button className="save_but" onClick={() => save_card(post.id)}><img src={save} /></button>
                <button className="delete_but" onClick={() => delete_card(post.id)}><img src={deleteImg} /></button>
              </div>
            </li>
          );
        })


      }
    </ul>
  </div>
);

}