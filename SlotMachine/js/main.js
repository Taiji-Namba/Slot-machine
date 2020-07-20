'use strict';

{  
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains ('inactive')){
          return;
        } 
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        panelsLeft--;
        
        if (panelsLeft === 0){
          start.classList.remove('inactive');
          panelsLeft = 3;
          checkResult();
        }
      });

      section.appendChild (this.img);
      section.appendChild (this.stop);

      const panelWrapper = document.querySelector ('.panelWrapper');
      panelWrapper.appendChild (section);
    }
    
    getRandomImage(){
      const images = [
        'img/kouseki_daiza_colorful.png',
        'img/kouseki1_red.png',
        'img/jewel06_moonstone.png',
        'img/jewel06_moonstone.png',
        'img/jewel06_moonstone.png',
        'img/jewel14_turquoise.png',
      ];
      return images[Math.floor(Math.random()*images.length)];
    }

    start(){
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.start();
      }, 50);
    }

    isUnmatched(p1,p2){
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove ('unmatched');
      this.stop.classList.remove ('inactive');
    }

  }

  function checkResult(){
    if (panels[0].isUnmatched(panels[1], panels[2], panel[3])){
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2], panel[3])){
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1],panel[3])){
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;

  const start = document.getElementById('start');
  start.addEventListener('click', () =>{
    if (start.classList.contains('inactive')){
      return
    }
    start.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.start();
    });
  });
}