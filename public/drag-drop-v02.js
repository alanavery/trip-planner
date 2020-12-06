gsap.registerPlugin(Draggable);

let segments = Array.from(document.querySelectorAll('.segment'));
let rowSize = 100;

let initLists = () => {
  let testSegments = document.querySelector('.day-segments');
  testSegments.style.height = `${segments.length * rowSize}px`;
  segments.forEach((container, index) => {
    gsap.set(container, { y: index * rowSize });
    Draggable.create(container, {
      type: 'y',
      bounds: testSegments,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd
    });
  });
};

function handleDrag() {
  let from = segments.indexOf(this.target);
  let to = Math.round(this.y / rowSize);
  if (from !== to) {
    reorderArray(segments, from, to);
    segments.forEach((segment, index) => {
      if (segment !== this.target) {
        layout(segment, index);
      }
    });
  }
};

function handleDragEnd() {
  layout(this.target, segments.indexOf(this.target));
}

let reorderArray = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

let layout = (segment, index) => {
  gsap.to(segment, {
    duration: 0.5,
    y: index * rowSize
  });
};

initLists();