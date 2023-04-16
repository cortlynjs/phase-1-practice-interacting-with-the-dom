document.addEventListener("DOMContentLoaded", () => {
    const counter = document.getElementById("counter");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const heart = document.getElementById("heart");
    const pause = document.getElementById("pause");
    const likes = document.querySelector(".likes");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    let count = 0;
    let paused = false;
    let intervalID = setInterval(incrementCounter, 1000);
  
    function incrementCounter() {
      if (!paused) {
        count++;
        counter.innerText = count;
      }
    }
  
    function decrementCounter() {
      count--;
      counter.innerText = count;
    }
  
    function likeNumber() {
      let found = false;
      Array.from(likes.children).forEach(like => {
        if (like.dataset.number === counter.innerText) {
          found = true;
          like.dataset.likes = parseInt(like.dataset.likes) + 1;
          like.innerText = `${counter.innerText} has been liked ${like.dataset.likes} times`;
        }
      });
      if (!found) {
        const li = document.createElement("li");
        li.dataset.number = counter.innerText;
        li.dataset.likes = 1;
        li.innerText = `${counter.innerText} has been liked 1 time`;
        likes.appendChild(li);
      }
    }
  
    function togglePause() {
      paused = !paused;
      minus.disabled = !minus.disabled;
      plus.disabled = !plus.disabled;
      heart.disabled = !heart.disabled;
      if (paused) {
        pause.innerText = "resume";
      } else {
        pause.innerText = "pause";
      }
    }
  
    function addComment(event) {
      event.preventDefault();
      const comment = commentInput.value.trim();
      if (comment !== "") {
        const div = document.createElement("div");
        div.innerText = comment;
        const list = document.getElementById("list");
        list.appendChild(div);
        commentInput.value = "";
      }
    }
  
    minus.addEventListener("click", decrementCounter);
    plus.addEventListener("click", incrementCounter);
    heart.addEventListener("click", likeNumber);
    pause.addEventListener("click", togglePause);
    commentForm.addEventListener("submit", addComment);
  