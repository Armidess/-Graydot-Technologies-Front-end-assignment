document.addEventListener("DOMContentLoaded", function () {
	const container1 = document.getElementById("container1");
	const container2 = document.getElementById("container2");
	const resetButton = document.getElementById("resetButton");

	// Add event listeners to the items in container1
	const items = container1.getElementsByClassName("item");
	for (const item of items) {
		item.addEventListener("dragstart", dragStart);
		item.addEventListener("dragend", dragEnd);
	}

	// Add event listeners to container2
	container2.addEventListener("dragover", dragOver);
	container2.addEventListener("dragenter", dragEnter);
	container2.addEventListener("dragleave", dragLeave);
	container2.addEventListener("drop", drop);

	// Reset button event listener
	resetButton.addEventListener("click", resetContainers);

	let draggedItem = null;

	function dragStart() {
		draggedItem = this;
		this.classList.add("dragging");
	}

	function dragEnd() {
		this.classList.remove("dragging");
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function dragEnter(e) {
		e.preventDefault();
		this.classList.add("drag-over");
	}

	function dragLeave() {
		this.classList.remove("drag-over");
	}

	function drop() {
		this.classList.remove("drag-over");
		const newItem = draggedItem.cloneNode(true);
		const successMessage = "Item dropped successfully!";

		// Remove any existing message container
		const existingMessageContainer =
			document.getElementById("messageContainer");
		if (existingMessageContainer) {
			existingMessageContainer.remove();
		}

		const messageContainer = createMessageContainer(successMessage);
		messageContainer.id = "messageContainer";

		const itemContainer = document.createElement("div");
		itemContainer.classList.add("item-container");
		itemContainer.appendChild(newItem);

		this.appendChild(itemContainer);
		this.appendChild(messageContainer);
		attachDragListeners(newItem);
		draggedItem.parentNode.removeChild(draggedItem);
		draggedItem = null;
	}

	function createMessageContainer(message) {
		const container = document.createElement("div");
		container.classList.add("message-container");
		container.innerText = message;
		return container;
	}

	function resetContainers() {
		container1.innerHTML = `
            <div class="item" draggable="true">Item 1</div>
            <div class="item" draggable="true">Item 2</div>
            <div class="item" draggable="true">Item 3</div>
        `;
		container2.innerHTML = "<p>Drop items here</p>";

		// Re-attach event listeners to the items in container1
		const items = container1.getElementsByClassName("item");
		for (const item of items) {
			item.addEventListener("dragstart", dragStart);
			item.addEventListener("dragend", dragEnd);
		}
	}
	function attachDragListeners(item) {
		item.addEventListener("dragstart", dragStart);
		item.addEventListener("dragend", dragEnd);
	}
});
