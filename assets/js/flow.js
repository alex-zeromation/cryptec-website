document.querySelectorAll('[data-flow]').forEach(function (flow) {
  var tabs = flow.querySelectorAll('.flow-tab');
  var slides = flow.querySelectorAll('.flow-slide');
  var current = 0;
  var timer = null;

  function show(index) {
    current = index;
    tabs.forEach(function (tab, i) {
      var active = i === index;
      tab.classList.toggle('active', active);
      if (active) {
        var fill = tab.querySelector('.flow-bar-fill');
        fill.style.animation = 'none';
        void fill.offsetWidth;
        fill.style.animation = '';
      }
    });
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      show((current + 1) % tabs.length);
    }, 4600);
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      show(i);
      restart();
    });
  });

  flow.addEventListener('mouseenter', function () { tabs[current].classList.add('paused'); if (timer) clearInterval(timer); });
  flow.addEventListener('mouseleave', function () { tabs[current].classList.remove('paused'); restart(); });

  show(0);
  restart();
});
