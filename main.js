const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const a = 2 * Math.PI / 6;
const r = 20;
const hex_width = (Math.sqrt(3)*r)
const hex_height = (3/2*r)
const map_width = 25
const map_height = 25
const hexes = []

canvas.height = hex_height*map_height
canvas.width = hex_width*map_width
console.log("map width: " + map_width)

canvas.addEventListener("click", (e) =>{
    const x = e.clientX - canvas.getBoundingClientRect().left
    const y = e.clientY - canvas.getBoundingClientRect().top
    checkIfInHex(x,y)     
    console.log(x, y)
})

function drawHexagon(hex) {

  ctx.beginPath();
  for (var i = 0; i < 6; i++) {
    const tempx = hex['x'] + r * Math.sin(a * i)
    const tempy = hex['y'] + r * Math.cos(a * i)
    ctx.lineTo(tempx, tempy);
    hex['corners'].push([tempx, tempy])
  }
  ctx.closePath();
  ctx.fillStyle = hex['color'];
  ctx.fill();
  ctx.strokeStyle ="#000"
  ctx.stroke();
  ctx.textAlign = "center"
  ctx.fillStyle= "black"
  ctx.font = "7px Arial";
  ctx.fillText("x", hex['x'],hex['y'])
  hexes.push(hex)
}


function selectColor(){
  const d4one = Math.floor(Math.random()*4)
  const d4two = Math.floor(Math.random()*4)
  const cols = {
    2: "green",
    3: "green",
    4: "brown",
    5: "brown",
    6: "brown",
    7: "lightblue",
    8: "pink"
  }
  return cols[d4one+1+d4two+1]
}
function storeHex(hexData){
  hexes.push(hexData)
}

var x=(Math.sqrt(3)*r)/2
var y=r/2
for (let j=0;j<map_height+1;j++){
  if (j%2 == 0){
    x=hex_width/2
  }else{
    x=hex_width/2-hex_width/2
  }
  for (let i=0;i<map_width+1;i++){
    const coord = [j+1,i+1]
    const col = selectColor()
    drawHexagon({
      x:x,
      y:y,
      color:col,
      coords:coord,
      corners:[],
    })
    x+=Math.sqrt(3)*r
  }
  y += 3/2*r
}

console.log(hexes)



