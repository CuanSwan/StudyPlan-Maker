const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


const hexes = [];

canvas.addEventListener("click", (e) =>{
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    for (let hex in hexes){
      if(checkIfInHex(x, y, hexes[hex])){
        console.log(`In hex ${hexes[hex]['coords']}`)
      }
    }
    drawMap()
})

document.getElementById('submitButton').addEventListener('click', (e) =>{
    let r = 20;
    let map_width = 10;
    let map_height = 10;
    const colours = []
    const inputs = document.getElementById("map-details").elements;
    console.log(inputs)
    for (let i=0; i<inputs.length; i++){
      if (inputs[i].id === "height"){
        map_height = +inputs[i].value
        if (map_height < 10){
          map_height = 10
        }
      }else if (inputs[i].id == "width"){
        map_width = +inputs[i].value
        if (map_width <10){
          map_width = 10
        }
      }else if(inputs[i].id == "hex_size"){
        r = +inputs[i].value
        if (r <20){
          r = 20
        }
      }else if (inputs[i].type == "color"){
        colours.push(inputs[i].value)
      }
    };
    const a = 2 * Math.PI / 6;
    const hex_width = (Math.sqrt(3)*r);
    const hex_height = (3/2*r);

    canvas.height = hex_height*map_height;
    canvas.width = hex_width*map_width;
    console.log("map width: " + map_width);
    console.log("hex size: " + r)
    console.log("map height: " + map_height)
    console.log("colours: " + colours)
    generateMap(map_height, map_width, r, hex_width, colours)
    drawMap(a, r)
})

document.getElementById('download').addEventListener('click', (e)=>{
  let canvasURL = canvas.toDataURL();

  const createEl = document.createElement('a');
  createEl.href = canvasURL;

  createEl.download = "map-1";
  createEl.click();
  createEl.remove();
})

function drawMap(a, r){
  for (let hex in hexes){
        drawHexagon(hexes[hex], a ,r);
  }
}

function drawHexagon(hex, a, r) {
  ctx.beginPath();
  for (var i = 0; i < 6; i++) {
    const tempx = hex['x'] + r * Math.sin(a * i);
    const tempy = hex['y'] + r * Math.cos(a * i);
    ctx.lineTo(tempx, tempy);
    hex['corners'].push([tempx, tempy]);
  };
  ctx.closePath();
  ctx.fillStyle = hex['colour'];
  ctx.fill();
  ctx.strokeStyle ="#222";
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle= "black";
  ctx.font = "7px Arial";
  ctx.fillText(hex['coords'], hex['x'],hex['y']);
}


function selectColor(colours){
  const d4one = Math.floor(Math.random()*4);
  const d4two = Math.floor(Math.random()*4);
  const cols = {
    2: colours[1],
    3: colours[1],
    4: colours[0],
    5: colours[0],
    6: colours[0],
    7: colours[2],
    8: colours[3]
  };
  return cols[d4one+1+d4two+1]
}
function storeHex(hexData){
  hexes.push(hexData);
}

function checkIfInHex(x, y, hex){
  const r = hex['r']
  var m = r*Math.cos(Math.PI/6),
      d = Math.hypot(x-hex['x'], y-hex['y']),
      a = Math.atan2(hex['y']-y, x-hex['x'])
      return d <= (r+m)/2 + Math.cos(a*6)*(r-m)/2;
}

function generateMap(map_height, map_width, r,hex_width, colours){
    var x=(Math.sqrt(3)*r)/2;
    var y=r/2;
    for (let j=0;j<map_height+1;j++){
      if (j%2 == 0){
        x=hex_width/2;
      }else{
        x=hex_width/2-hex_width/2;
      };
      for (let i=0;i<map_width+1;i++){
        const coord = [j+1,i+1];
        const col = selectColor(colours);
        storeHex({
          x:x,
          y:y,
          colour:col,
          coords:coord,
          corners:[],
          r:r
        })
        x+=Math.sqrt(3)*r;
      };
      y += 3/2*r;
    };
}




