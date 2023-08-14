// index.js
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch cart items from the server
  const response = await fetch("/cart");
  const data = await response.json();

  // Update the cart items in the HTML
  const cartItemsContainer = document.querySelector(".cart-items tbody");
  cartItemsContainer.innerHTML = ""; // Clear the existing items

  if (data.cartItems.length > 0) {
    data.cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "cart-item";
      row.innerHTML = `
          <td class="leftItem">
            <img src="${item.image}" class="productImage">
          </td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>Rs.${item.price * item.quantity}</td>
          <td>
            <button class="btn-delete" type="button" onclick="deleteCartItem('${
              item._id
            }')">Delete</button>
          </td>
        `;
      cartItemsContainer.appendChild(row);
    });

    const subTotalContainer = document.querySelector(".subTotalContainer");
    subTotalContainer.textContent = `Subtotal: Rs. ${data.subtotal}`;
  } else {
    const cartEmptyMessage = document.createElement("p");
    cartEmptyMessage.textContent =
      "Your cart is empty. Add items to continue shopping.";
    cartItemsContainer.appendChild(cartEmptyMessage);

    const subTotalContainer = document.querySelector(".subTotalContainer");
    subTotalContainer.textContent = "";
  }
});

async function deleteCartItem(itemId) {
  try {
    const response = await fetch(`/cart/${itemId}`, { method: "DELETE" });
    if (response.ok) {
      location.reload(); // Refresh the page to update the cart
    }
  } catch (error) {
    console.error(error);
  }
}
