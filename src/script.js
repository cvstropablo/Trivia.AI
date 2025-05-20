
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let floatingWords = [];

document.getElementById('answerSubmit').onclick = function (){
    const input = document.getElementById('answerInput').value.trim();
    if (!floatingWords.find(word => word.text === input)) {
      floatingWords.push({
        text: input,
        x: Math.random() * (canvas.width * 0.8),
        y: Math.random() * (canvas.height * 0.8),
        dx: (Math.random() - 0.5) * 5 + 1,
        dy: (Math.random() - 0.5) * 5 + 1,
      });
    }
    document.getElementById('answerInput').value = '';
}


function drawWord(wordObj) {
  ctx.font = "24px Arial";
  const paddingX = 20;
  const paddingY = 10;

  const textWidth = ctx.measureText(wordObj.text).width;
  const textHeight = 24;

  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = textHeight + paddingY * 2;

  wordObj.boxWidth = boxWidth;
  wordObj.boxHeight = boxHeight;

  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(wordObj.x, wordObj.y, boxWidth, boxHeight);

  ctx.fillStyle = "#ffffff"; 
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(wordObj.text, wordObj.x + paddingX, wordObj.y + paddingY);
}




function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //add motion
    floatingWords.forEach((word) => {
        drawWord(word);

        word.x += word.dx;
        word.y += word.dy;
        
        //collisions 
        if (word.x <= 0 || word.x + word.boxWidth >= canvas.width) {
        word.dx *= -1;
        }
        
        if (word.y <= 0 || word.y + word.boxHeight >= canvas.height) {
        word.dy *= -1;
        }
    });
    requestAnimationFrame(update);
}

update();