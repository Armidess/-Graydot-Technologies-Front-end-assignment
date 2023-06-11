document.addEventListener("DOMContentLoaded", function () {
	const container1 = document.querySelector(".container-left");
	const container2 = document.getElementById("container2");
	const resetButton = document.getElementById("resetButton");

	container1.addEventListener("dragstart", dragStart);
	container2.addEventListener("dragover", dragOver);
	container2.addEventListener("dragenter", dragEnter);
	container2.addEventListener("dragleave", dragLeave);
	container2.addEventListener("drop", drop);

	resetButton.addEventListener("click", resetContainers);

	let draggedItem = null;

	function dragStart(event) {
		draggedItem = event.target;
		event.target.classList.add("dragging");
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
		newItem.classList.remove("item");
		newItem.classList.remove("dragging");
		newItem.removeAttribute("draggable");
		const successMessage = "Item dropped successfully!";

		const existingMessageContainer =
			document.getElementById("messageContainer");
		if (existingMessageContainer) {
			existingMessageContainer.remove();
		}

		const messageContainer = createMessageContainer(successMessage);
		messageContainer.id = "messageContainer";

		const itemContainer = document.createElement("div");
		itemContainer.classList.add("item-container");

		if (draggedItem.classList.contains("image-item")) {
			newItem.classList.remove("image-item");
		}

		itemContainer.appendChild(newItem);

		this.appendChild(itemContainer);
		this.appendChild(messageContainer);
		draggedItem.classList.add("dropped");
		draggedItem.removeAttribute("draggable");
		draggedItem.style.display = "none";
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
		<div class="item" draggable="true">
			<p>Text 1</p>
		</div>
		<div class="item" draggable="true">
			<p>Text 2</p>
		</div>
		<div class="image-item" draggable="true">
			<img src="img1.jpg" alt="Image 1" draggable="false" />
		</div>
		<div class="image-item" draggable="true">
			<img src="img2.jpg" alt="Image 2" draggable="false" />
		</div>
        `;

		container2.innerHTML = `
            <p>Drop items here</p>
        `;
	}
});
