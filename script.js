const container = document.querySelector('.container');
const boxes = [...document.querySelectorAll('.box')];
let dragging;

const onDragStart = e => {
  e.target.classList.add('dragging');
  dragging = +e.target.id;
  
}

const onDragEnd = e => {
  e.target.classList.remove('dragging');
}

const onDragOver = e => {
  e.preventDefault();
}
const onDragOverOnBox = e => {
  e.preventDefault();
  const id = +e.target.textContent;
  if (id !== dragging) {
    const box = document.getElementById(id);
    const move = document.getElementById(dragging);
    const pos = move.compareDocumentPosition(box);
    if (pos === Node.DOCUMENT_POSITION_FOLLOWING) {
      container.insertBefore(box, move);
    } else {
      container.insertBefore(move, box);
    }
  }
}

const onDrop = e => {
  const box = e.dataTransfer.getData('box');
}

container.addEventListener('dragover', onDragOver);
container.addEventListener('drop', onDrop)

boxes.forEach(box => {
  box.draggable = true;
  box.addEventListener('dragstart', onDragStart);
  box.addEventListener('dragend', onDragEnd);
  box.addEventListener('dragover', onDragOverOnBox);
})