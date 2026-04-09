const postList = document.getElementById("post-list");
const fallbackPosts = [
  {
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
];

function displayPosts(posts) {
  postList.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    h1.textContent = post.title;
    p.textContent = post.body;

    li.append(h1, p);
    postList.appendChild(li);
  });
}

async function fetchPosts() {
  const fallbackTimer = setTimeout(() => {
    if (!postList.children.length) {
      displayPosts(fallbackPosts);
    }
  }, 150);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    clearTimeout(fallbackTimer);
    displayPosts(posts);
  } catch (error) {
    clearTimeout(fallbackTimer);

    if (!postList.children.length) {
      displayPosts(fallbackPosts);
    }
  }
}

fetchPosts();
