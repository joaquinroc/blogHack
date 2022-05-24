const addCommentBtn = document.querySelector("#addCommentBtn");
const comment = document.querySelector("#comment");
// const inputNumber1 = document.querySelector("#number-1").textContent;
// const inputNumber2 = document.querySelector("#number-2").textContent;

addCommentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/comment", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "hola que tal che",
      createdAt: "",
      articleId: "2",
      userId: "2",
    }),
  })
    .then((res) => res.json())
    .then((number) => {
      comment.textContent = `Funciona!`;
    });
});
