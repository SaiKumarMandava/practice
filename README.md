# practice
Just Practising Github from organisation POint of View






#adding and deleting element by using dom
<!DOCTYPE html>
<html lang="en">

<head>

	<style>
		#candidate {
			border-radius: 20%;
			border-color: aquamarine;
			box-sizing: border-box;
		}
		
		.buttonClass {
			border-radius: 20%;
			border-color: aqua;
			border-style: inherit;
		}
		
		button:hover {
			background-color: green;
		}
	</style>
</head>

<body>
	<ul id="list"></ul>

	<input type="text" id="candidate" />
	<button onclick="addItem()" class="buttonClass">
	Add item</button>
	<button onclick="removeItem()" class="buttonClass">
	Remove item</button>

	<script>
		function addItem() {
			var a = document.getElementById("list");
			var candidate = document.getElementById("candidate");
			var li = document.createElement("li");
			li.setAttribute('id', candidate.value);
			li.appendChild(document.createTextNode(candidate.value));
			a.appendChild(li);
		}

		// Creating a function to remove item from list
		function removeItem() {

			// Declaring a variable to get select element
			var a = document.getElementById("list");
			var candidate = document.getElementById("candidate");
			var item = document.getElementById(candidate.value);
			a.removeChild(item);
		}
	</script>
</body>

</html>



#crude operations with localstorage


import React, { useState, useEffect } from "react";

// CRUD Component
function App() {
  // Local state for storing items
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load data from localStorage (if needed)
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  // Save data to localStorage (if needed)
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Add item
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem }]);
      setNewItem("");
    }
  };

  // Delete item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Start editing item
  const startEdit = (id, text) => {
    setEditItemId(id);
    setEditText(text);
  };

  // Update item
  const updateItem = () => {
    setItems(
      items.map((item) =>
        item.id === editItemId ? { ...item, text: editText } : item
      )
    );
    setEditItemId(null);
    setEditText("");
  };

  return (
    <div>
      <h1>Simple CRUD App</h1>

      {/* Input to add new item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <>
                {/* Input for editing */}
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={updateItem}>Update</button>
              </>
            ) : (
              <>
                {item.text}{" "}
                <button onClick={() => startEdit(item.id, item.text)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

