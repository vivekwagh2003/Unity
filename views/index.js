// index.js (client-side)
const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require("mongoose");
// Function to delete an item from the cart
function deleteItem(itemId) {
  // Send a request to the server to delete the item with the given itemId
  fetch(`/deleteItem/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // If the item was successfully deleted, reload the page to update the cart
      if (data.success) {
        window.location.reload();
      }
    })
    .catch((error) => console.error("Error deleting item:", error));
}

// Get all delete buttons with class 'btn-delete'
const deleteButtons = document.querySelectorAll(".btn-delete");

// Add click event listener to each delete button
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the item ID from the data-item-id attribute of the button
    const itemId = button.dataset.itemId;

    // Call the deleteItem function with the item ID
    deleteItem(itemId);
  });
});
