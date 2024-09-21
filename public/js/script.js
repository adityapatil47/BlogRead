function toggleLike(postIndex) {
  // Get the image element by its ID
  const imgElement = document.getElementById(`likeImg-${postIndex}`);
  const currentSrc = imgElement.getAttribute("src");

  // Toggle the image locally
  if (currentSrc.includes("notliked.png")) {
    imgElement.setAttribute("src", "/images/liked.png");
  } else {
    imgElement.setAttribute("src", "/images/notliked.png");
  }

  // Send the updated like state to the server using fetch (AJAX)
  fetch("/toggleLike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postIndex: postIndex }), // Send the index of the post to toggle
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post like state updated:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
