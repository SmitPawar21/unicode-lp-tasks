import './App.css';
import { CardArea } from './CardArea';
import cross from "./images/cross.svg";
import { createCards } from "./CardArea";
import like from "./images/like.svg";
import dislike from "./images/dislike.svg";
import edit from "./images/edit.svg";
import deleteImg from "./images/delete.svg";

function App() {

  //this function opens add card section
  const openAddCard = () => {
    const addCard = document.querySelector(".add_post_section");
    addCard.style.display = "flex";
  }

  //this function closes add card section
  const closeAddCard = () => {
    const addCard = document.querySelector(".add_post_section");
    addCard.style.display = "none";
  }

  const addNewPost = () => {
    const user_id = document.querySelector(".user_id").value;
    const post_title = document.querySelector(".post_title").value;
    const post_body = document.querySelector(".post_body").value;

    try {
      fetch('https://dummyjson.com/posts/add', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ title: post_title, body: post_body, userId: user_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
    }
    catch (err) {
      console.log("errror ieferne ");
    }

    const card_block = document.querySelector(".card_block");
    const card = document.createElement("li");
    card.className = "card";

    card.innerHTML = `
                <div class="user_info">
                  <span></span>
                  <h3> user id: ${user_id}</h3>
                </div>
                <h1 class="title"> ${post_title} </h1>
      
                <textarea spellcheck='false'> ${post_body} </textarea>
      
                <h3>0 views</h3>
                <div class="reactions">
                  <span>
                    <img src='${like}' />
                    0
                  </span>
                  <span>
                    <img src='${dislike}' />
                    0
                  </span>
                  <button><img src='${edit}' /></button>
                  <button class="delete_but"><img src='${deleteImg}' /></button>
                </div>
    `;
    card_block.appendChild(card);
    // card_block.innerHTML = card_block.innerHTML + card.innerHTML;
  }

  return (
    <div className="App">
      <div className='navbar'>
        <h1> Post gallery </h1>
        <button className='add_button' onClick={openAddCard}> Add Post </button>
      </div>
      <CardArea />
      <div className='add_post_section'>
        <div className='add_card'>
          <div className='top' onClick={closeAddCard}>
            <img src={cross} />
          </div>
          <div>
            <h3>Enter Your User Id </h3>
            <input type='number' className='user_id' />
          </div>
          <div>
            <h3>Write Title Of Your Post </h3>
            <input type='text' spellCheck={false} className='post_title' />
          </div>
          <div>
            <textarea rows={10} cols={70} placeholder='Write here...' spellCheck={false} className='post_body' />
          </div>
          <button className='new_post_button' onClick={addNewPost}> Post </button>
        </div>

      </div>
    </div>
  );
}

export default App;
