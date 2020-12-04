document.addEventListener('DOMContentLoaded', () => {




  console.log('drag-drop.js is working');

  // Register plugin with GSAP core
  // gsap.registerPlugin(Draggable);

  let rowSize = 100;
  let container = document.querySelector('.container');
  let listItems = Array.from(document.querySelectorAll('.list-item'));
  // let sortables = listItems.map(sortable);
  // let total = sortables.length;

  gsap.to(container, {
    duration: 2,
    autoAlpha: 0
  });

  gsap.to(".box", { rotation: 27, x: 100, duration: 1 });


  console.log('drag-drop.js is working here too');





});

