// start slingin' some d3 here.

//Game Start Parameters
var parameter = {
  height: 800,
  width: 800,
  nEnemies: 5,
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

//create coordinates
var x = function() {
  d3.scale.linear().domain([0, 100]).range(0, parameter.width);
};
var y = function() {
  d3.scale.linear().domain([0, 100]).range(0, parameter.height);
};

//Classes
var Player = function() {
  this.x = 0;
  this.y = 0;
  this.r = 5;
};

var Enemy = function() {
  this.r = parameter.EnemySize;
  this.x = Math.random() * parameter.width;
  this.y = Math.random() * parameter.height;
};

//Creating Objects on the Screen
var createPlayer = function(player) {
  d3.selectAll('svg')
  .append('svg:circle') //circle object
    .attr('cx', parameter.height / 2 ) //start position
    .attr('cy', parameter.height / 2) //end position
    .attr('r', player.r)
    .style('fill', 'purple');
};

var createEnemy = function(array) {
  board.selectAll('svg')
    .data(array) //uses array of data
    .enter()
    .append('svg:circle')
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      })
      .attr('r', function(d) {
        return d.r;
      })
      .style('fill', 'blue');
};

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




//mouse movement
board.on('mousemove', movePlayer);
var movePlayer = function(d, i) {
  var mouse = {
    x: d3.mouse(this)[0],
    y: d3.mouse(this)[1]
  };
  // var delta = {
  //   x: mouse.x - player.x,
  //   y: mouse.y - player.y
  // };
  player.x = mouse.x;
  player.y = mouse.y;
  return player.attr('transform', ('translate(' + player.x + ',' + player.y + ')'));
};






























