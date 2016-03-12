// start slingin' some d3 here.

////////////////////////////////////////////////////////////////////////////////////////
//Game Start Parameters
var parameter = {
  height: 800,
  width: 800,
  nEnemies: 30,
  EnemySize: 10
};

var difficulty = {
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
  this.r = 10;
};

var Enemy = function() {
  this.r = parameter.EnemySize;
  this.x = Math.random() * parameter.width;
  this.y = Math.random() * parameter.height;
};

/////////////////////////////////////////////////////////////////////////////////////
//Rendering 

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
    .attr('cx', function(d) { return Math.random() * parameter.width; })
    .attr('cy', function(d) { return Math.random() * parameter.height; })
    .style('fill', Math.floor(Math.random() * 16777215).toString(16));
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


setInterval(randomlyMoveEnemies, 1000);

// randomlyMoveEnemies();

























