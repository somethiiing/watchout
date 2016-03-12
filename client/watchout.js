// start slingin' some d3 here.
//functions needed
//-> limit the mouse movements within the board
//-> collission function

////////////////////////////////////////////////////////////////////////////////////////
//Game Start Parameters
var parameter = {
  height: 800,
  width: 800,
  nEnemies: 30,
  EnemySize: 10,
  playerSize: 10
};

var difficulty = {
  pace: 2000,
  speed: 1000,
  speedMultiplier: 2,
  enemyMultiplier: 2
};

//attach board
var board = d3.select('.board').append('svg:svg')
  .attr('width', parameter.width)
  .attr('height', parameter.height)
  .style('background-color', '#C0C0C0');

///////////////////////////////////////////////////////////////////////////////////////
//Classes
var Player = function() {
  this.x = 0;
  this.y = 0;
  this.r = parameter.playerSize;
};

var Enemy = function() {
  this.r = parameter.EnemySize;
  this.x = Math.random() * parameter.width;
  this.y = Math.random() * parameter.height;
};

/////////////////////////////////////////////////////////////////////////////////////
//Rendering & Engines

//Rendering
////////////

//Creating player
var createPlayer = function(player) {
  d3.selectAll('svg')
  .append('svg:circle') //circle object
    .attr('class', 'player')
    .attr('cx', parameter.width / 2 ) //start position
    .attr('cy', parameter.height / 2) //end position
    .attr('r', player.r)
    .style('fill', 'purple')
    .call(drag);
};

//Creating Enemy
var createEnemy = function(array) {
  board.selectAll('svg')
    .data(array) //uses array of data
    .enter()
    .append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', function(d) { return d.r; })
      .style('fill', 'blue');
};

var randomlyMoveEnemies = function() {
  board.selectAll('.enemy')
    .transition()
      .duration(difficulty.speed)
    .attr('cx', function(d) { return Math.random() * parameter.width; })
    .attr('cy', function(d) { return Math.random() * parameter.height; })
    .style('fill', Math.floor(Math.random() * 16777215).toString(16));
};

//Engines
///////////
var checkCollision = function (enemiesArr) {
  var minDistance = parameter.EnemySize + parameter.playerSize;  //maybe hardcode this for testing
  var checkX = parseInt(d3.selectAll('.player').attr('cx')); //position of mouse x-coordinate
  var checkY = parseInt(d3.selectAll('.player').attr('cy')); //position of mouse y-coordinate

  enemiesArr = d3.selectAll('.enemy')[0];
  for (var i = 0; i < enemiesArr.length; i++) {
    // console.log(enemiesArr[i].cx.animVal.value + " , " + enemiesArr[i].cy.animVal.value);
    var enemyX = parseInt(enemiesArr[i].cx.animVal.value);
    var enemyY = parseInt(enemiesArr[i].cy.animVal.value);

    var distance = Math.sqrt(Math.pow((enemyX - checkX), 2) + Math.pow((enemyY - checkY), 2));
    if (minDistance > distance) {
      return true;
    }
  }
  return false;
};
//Scoreboard
var currentScore = 0;
var highScore = 0;
var collisions = 0;

var scoreboardUpdate = function (boolean) {
  if (boolean === false) {
    currentScore = currentScore + (1 * parameter.nEnemies);
    if (highScore <= currentScore) {
      highScore = currentScore;
    }
  } else {
    currentScore = 0;
    collisions++;
  }
  d3.select('.scoreboard')
  .select('.highscore')
    .text("High Score: " + highScore.toString());
  d3.select('.scoreboard')
  .select('.current')
    .text("Current Score: " + currentScore.toString());
  d3.select('.scoreboard')
  .select('.collisions')
    .text("Collisions: " + collisions);
};

///////////////////////////////////////////////////////////////////////////////////////
//var helper function

///Mouse Move Functions
//Define Drag Move
var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x);
  d3.select(this).attr('cy', y);
};

//define drag move behavior
var drag = d3.behavior.drag()
  .on('drag', dragmove);
  //.on('drag', checkCollision);

///////////////////////////////////////////////////////////////////////////////////////
//game initialization


//initialize Player
var player = new Player;

//initialize enemy Storage
var enemies = [];

//push new enemies into storage
for (var i = 0; i < parameter.nEnemies; i++) {
  enemies.push(new Enemy);
}

//populate board with enemies and player
createPlayer(player);
createEnemy(enemies);

setInterval(randomlyMoveEnemies, difficulty.pace);
setInterval(function() {
  var result = checkCollision();
  scoreboardUpdate(result);
}, 100);


























