const enemy = document.querySelector('.enemy');
const healthPoint = document.querySelector('.point_health');
const monsterName = document.querySelector('.monster_name');
const coins = document.querySelector('.player_coins');
// const back = document.querySelector('.backAcc');
const arena = document.querySelector('.arena');
const enemyBlock = document.querySelector('.enemy_block');
const start = document.querySelector('.start_text');

let coin = 0;
let _k = 0;
let _s = 0;
let st = false;

start.addEventListener('click', function() {
	start.classList.add('anim');
  	start.remove();
  	startTimer(299);
  	randomMonsterSet();
  	st = true;
});

setInterval(() => {
  if (st) {
   	setGoldBox();
	}
}, 120000);

setInterval(() => {
  if (st) {
    setShit();
  }
}, Math.floor(Math.random() * 5000 + 2000));

function randomMonsterSet() {
    setup();
    setTimeout(() => {
        randomMonsterSet();
    }, 500);
}

function setGoldBox() {
  	const sunduk = {
      	health: 200,
      	img: '/img/sunduk.gif'
    }
    let goldBox = document.createElement('div');
    enemyBlock.appendChild(goldBox);
    goldBox.className = Math.random().toString(36).substr(2, 5);
    goldBox.onclick = function(e) {
    	if (sunduk.health <= 0) {
           e.target.remove();
           _s++;
        }
      	sunduk.health -= 10;
    };
  	
    var box = arena.getBoundingClientRect();
    goldBox.style.top = getRandomInt(300, box.height-200) + 'px';
    goldBox.style.left = getRandomInt(0, box.width-200) + 'px';
  	goldBox.style.width = 200 + 'px';
  	goldBox.style.height = 200 + 'px';
    goldBox.style.backgroundImage = 'url(/img/sunduk.gif)';
  	goldBox.style.backgroundSize = 'cover';
  	goldBox.style.position = 'absolute';
  	setTimeout(function () {
        goldBox.remove();
     }, 12000);
}

function setShit() {
  let shitBox = document.createElement('div');
  enemyBlock.appendChild(shitBox);
  shitBox.className = 'enemy';
  shitBox.onclick = function(e) {
    _k -= 5;
    coin -= 5;
    if (_k < 0 || coin < 0) {
      _k = 0;
      coin = 0;
    }
    coins.textContent = coin;
    e.target.classList.add('boom');
      setTimeout(function () {
        e.target.remove();
     }, 2000);
  };
  
  var box = arena.getBoundingClientRect();
  shitBox.style.top = getRandomInt(300, box.height-200) + 'px';
  shitBox.style.left = getRandomInt(0, box.width-200) + 'px';
  shitBox.style.width = 100 + 'px';
  shitBox.style.height = 100 + 'px';
  shitBox.style.backgroundImage = `url('/img/shit.gif')`;
  shitBox.style.backgroundSize = 'contain';
  shitBox.style.position = 'absolute';
  setTimeout(function () {
      shitBox.remove();
   }, 4000);
}

function getRandomEnemy(monsters) {
    let randomMonster = Math.floor(Math.random() * monsters.length);
    return monsters[randomMonster];
}

function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function setup() {
  	let monster = getRandomEnemy(getMonsters());
    let enemyBox = document.createElement('div');
    enemyBlock.appendChild(enemyBox);
    enemyBox.className = 'enemy';
    enemyBox.onclick = function(e) {
      	_k += 1;
      	coin += 1;
        coins.textContent = coin;
        e.target.remove();
    };
  	var box = arena.getBoundingClientRect();
    enemyBox.style.top = getRandomInt(300, box.height-200) + 'px';
    enemyBox.style.left = getRandomInt(0, box.width-200) + 'px';
    enemyBox.style.backgroundImage = 'url(/img/' + monster +')';
  	setTimeout(function () {
        enemyBox.remove();
     }, 3000);
}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('.point_health').textContent = minutes + ":" + seconds;
        if (--timer < 0) {
          	timer = duration;
            window.location.reload;
          };
    }, 1000);
}

function getMonsters() {
   return [
    'dev1.gif',
    'dev2.gif',
    'fly_mouse.gif',
    'virus.gif'
  ];
}