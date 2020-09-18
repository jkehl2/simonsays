/**
 * 
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ['red', 'green', 'blue', 'yellow'],

  // this var will contain the sequence said by Simon
  sequence: [],
  indice: 0,
  endGameTimeOutId : null,

  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = color;
      // cell.addEventListener('click', userClick);
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  newGame: function () {
    // start by reseting the sequence 
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random() * 4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
    }

    // start the "Simon Says" sequence
    app.showMessage("Mémorisez la séquence");
    app.simonSays(app.sequence);
    setTimeout(() => {
      app.showMessage("Reproduisez la séquence");
      for (const color of app.colors) {
        let cell = document.getElementById(color);
        cell.addEventListener('click', app.userClick);
      }
      app.endGameTimeOutId = setTimeout(() => app.endGame(), 5000);
    }, ((app.sequence.length) * 850));
  },

  simonSays: function (sequence) {
    if (sequence != null && sequence.length > 0) {

      // after 500ms, bump the first cell
      setTimeout(app.bumpCell, 500, sequence[0]);
      // plays the rest of the sequence after a longer pause
      setTimeout(app.simonSays, 850, sequence.slice(1));
    }
  },

  userClick: function (event) {
    clearTimeout(app.endGameTimeOutId);
    app.bumpCell(event.target.id);
    if (event.target.id == app.sequence[app.indice]) {
      if (app.sequence.length - 1 > app.indice) {
        app.indice++;
      } else {
        for (const color of app.colors) {
          let cell = document.getElementById(color);
          cell.removeEventListener('click', app.userClick);
        }
        app.indice = 0;
        app.nextMove();
      }
    } else {      
      app.endGame();
    }
  },
  nextMove: function () {
    let random = Math.floor(Math.random() * 4);
    app.sequence.push(app.colors[random]);
    app.showMessage("Mémorisez la séquence");
    app.simonSays(app.sequence);
    setTimeout(() => {
      app.showMessage("Reproduisez la séquence");
      for (const color of app.colors) {
        let cell = document.getElementById(color);
        cell.addEventListener('click', app.userClick);
      }
      app.endGameTimeOutId = setTimeout(() => app.endGame(), 5000);
    }, (app.sequence.length) * 850);
  },

  init: function () {
    console.log('init');
    app.drawCells();

    // listen click on the "go" button
    document.getElementById('go').addEventListener('click', app.newGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  showMessage: function (message) {
    let messDiv = document.getElementById('message');
    messDiv.style.display = 'block';
    messDiv.innerHTML = message;

    document.getElementById('go').style.display = 'none';
  },
  hideMessage: function () {
    let messDiv = document.getElementById('message');
    messDiv.style.display = 'none';
    document.getElementById('go').style.display = 'block';
  },
  endGame: function () {
    for (const color of app.colors) {
      let cell = document.getElementById(color);
      cell.removeEventListener('click', app.userClick);
    }
    app.indice = 0;
    alert("Partie terminée. votre score : " + app.sequence.length);
    app.hideMessage();
    app.sequence = [];
  }
};
document.addEventListener('DOMContentLoaded', app.init);