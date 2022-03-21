canvas = document.querySelector('.canvas');
ctx = canvas.getContext('2d');

const slider = document.querySelector(".slider");
let header = document.getElementById("header");


//
const margin = 150;
canvas.height = 2048+2*margin;
canvas.width = 2048+2*margin;
const len = canvas.height-2*margin;

function d2xy(i) {
  let points = [
    [0,0],
    [0,1],
    [1,1],
    [1,0]
  ];

  let index = i & 3;
  let v = points[index];
  for(var j= 1; j<n; j++) {
  i = i>>2;
  index = i & 3;
  let lenCell = Math.pow(2,j);
  if(index == 0){
    let temp = v[0];
    v[0] = v[1];
    v[1] = temp;
  }else if (index == 1) {
    v[1] += lenCell;
  }else if (index == 2) {
    v[0] += lenCell;
    v[1] += lenCell;
  }else if (index == 3) {
    let temp = lenCell-1-v[0];
    v[0] = lenCell-1-v[1];
    v[1] = temp;
    v[0] += lenCell;
  }
}
  return v;
}

function draw(path) {
  for(var i=0; i<numNodes-1; i++) {
    ctx.beginPath();
    ctx.moveTo(...(path[i]));
    ctx.lineTo(...path[i+1]);
    ctx.stroke();
    // ctx.font = "50px Arial";
    // ctx.strokeText(i, ...(path[i].map(x=>x+60)));
  };
  //ctx.strokeText(numNodes-1, ...(path[numNodes-1].map(x=>x+60)));
};

function update() {
  headerUpdate(this);
  // fill the entire canvas with black before drawing the circles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle='black';
  ctx.fillRect(0,0,canvas.width,canvas.length);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  n = this.value;
  numCells = Math.pow(2,n);
  numNodes = numCells*numCells;

  let path = new Array(numNodes);

  for(var i = 0; i < numNodes; i++) {
    path[i] = d2xy(i);
    path[i] = path[i].map(x=>x*len/(numCells-1)+margin);
  };
  draw(path);
};

function headerUpdate(e) {
  header.innerHTML = "Krumelur:  " +`${e.value}` ;
};

let n = 1;
let numCells = Math.pow(2,n);
let numNodes = numCells*numCells;

let path = new Array(numNodes);

for(var i = 0; i < numNodes; i++) {
  path[i] = d2xy(i);
  path[i] = path[i].map(x=>x*len/(numCells-1)+margin);
};
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
draw(path);

slider.addEventListener('change',update);
