// Register Draggable plugin with GSAP core
gsap.registerPlugin(Draggable);

let rowSize = 100;
let container = document.querySelector('.container');
let listItems = Array.from(document.querySelectorAll('.list-item'));
let sortables = listItems.map(Sortable);
let total = sortables.length;

gsap.to(container, { autoAlpha: 1 });

function changeIndex(item, to) {
  arrayMove(sortables, item.index, to);
  if (to === total - 1) {
    container.appendChild(item.element);
  } else {
    if (item.index > to) {
      let i = to;
    } else {
      i = to + 1;
    }
    container.insertBefore(item.element, container.children[i]);
  }
  sortables.forEach((sortable, index) => sortable.setIndex(index));
}

function Sortable(element, index) {
  let content = element.querySelector('.item-content');
  let animation = gsap.to(content, {
    duration: 0.3,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 16px 32px 0px',
    force3D: true,
    scale: 1.1,
    paused: true
  });
  let dragger = new Draggable(element, {
    onDragStart: downAction,
    onRelease: upAction,
    onDrag: dragAction,
    cursor: 'inherit',
    type: 'y'
  });
  let sortable = {
    dragger: dragger,
    element: element,
    index: index,
    setIndex: setIndex
  };
  gsap.set(element, { y: index * rowSize });
  function setIndex(index) {
    sortable.index = index;
    if (!dragger.isDragging) {
      layout();
    }
  }
  function downAction() {
    animation.play();
    this.update();
  }
  function dragAction() {
    let index = clamp(Math.round(this.y / rowSize), 0, total - 1);
    if (index !== sortable.index) {
      changeIndex(sortable, index);
    }
  }
  function upAction() {
    animation.reverse();
    layout();
  }
  function layout() {
    gsap.to(element, {
      duration: 0.3,
      y: sortable.index * rowSize
    });
  }
  return sortable;
}

function arrayMove(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

function clamp(value, a, b) {
  if (value < a) {
    return a;
  } else if (value > b) {
    return b;
  } else {
    return value;
  }
}
