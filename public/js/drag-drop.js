// Register Draggable plugin with GSAP core
gsap.registerPlugin(Draggable);

let divDayMainAll = document.querySelectorAll('.div-day-main');
let rowSize = 220;

let reorderArray = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

let layout = (segment, index) => {
  gsap.to(segment, {
    duration: 0.5,
    y: index * rowSize
  });
};

divDayMainAll.forEach((div) => {
  let segmentsAll = Array.from(div.querySelectorAll('.div-segment'));
  div.style.height = `${segmentsAll.length * rowSize}px`;
  segmentsAll.forEach((segment, index) => {
    gsap.set(segment, { y: index * rowSize });
    Draggable.create(segment, {
      type: 'y',
      bounds: div,
      trigger: segment.querySelector('.icon-drag'),
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
      segmentsAll: segmentsAll
    });
  });
});

function handleDrag() {
  let segments = this.vars.segmentsAll;
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
}

function handleDragEnd() {
  layout(this.target, this.vars.segmentsAll.indexOf(this.target));
  let order = '';
  this.vars.segmentsAll.forEach((segment, index) => {
    if (index === 0) {
      order = order.concat(segment.querySelector('.segment-id').textContent);
    } else {
      order = order.concat(`, ${segment.querySelector('.segment-id').textContent}`);
    }
  });
  this.target.parentElement.previousElementSibling.querySelector('.segment-order').value = order;
  this.target.parentElement.previousElementSibling.querySelector(
    '.form-segment-order'
  ).hidden = false;
}
