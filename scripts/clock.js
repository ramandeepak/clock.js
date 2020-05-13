//This can also be implemented using images rather than drawing graphics on a canvas.

//Getting the canvas ready for drawing

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = 500;
ctx.canvas.height = 500;

function drawClock(secondsElapsed, minutesElapased, hoursElapsed) {

  //Clear canvas before redrawing the clock every second
  ctx.clearRect(0, 0, 500, 500);
  
  //Draw the time marks around the clock

  for(i=0;i<12;i++) {
    ctx.translate(250, 250);
    ctx.rotate(i * 30 * Math.PI / 180);
    if(i%2 == 0) {
      ctx.fillStyle = 'white';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.fillRect(210, 0, 20, 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  //Draw the white dot at the center of the clock
  ctx.fillStyle = 'white';
  ctx.fillRect(250, 250, 10, 10);
  
  //Change the origin of the canvas to the center of the circle
  ctx.translate(250, 250);

  //Hour hand position calculation and drawing it on the canvas 
  var delta =  Math.trunc(minutesElapased / 12);
  console.log(delta, minutesElapased / 12);
  var tempHoursDegrees = ((hoursElapsed * 12 * delta * Math.PI) - 270) / 180;
  var hourHandX = 0 + 150 * Math.cos(tempHoursDegrees);
  var hourHandY = 0 + 150 * Math.sin(tempHoursDegrees);

  ctx.beginPath();       
  ctx.moveTo(0, 0);
  ctx.lineTo(hourHandX, hourHandY); 
  ctx.strokeStyle = 'white';
  ctx.stroke();

  //Minute hand position calculation and drawing it on the canvas 

  var tempMinutesDegrees = ((minutesElapased * 6 * Math.PI) - 270) / 180;
  var minuteHandX = 0 + 180 * Math.cos(tempMinutesDegrees);
  var minuteHandY = 0 + 180 * Math.sin(tempMinutesDegrees);

  ctx.beginPath();       
  ctx.moveTo(0, 0);
  ctx.lineTo(minuteHandX, minuteHandY);
  ctx.strokeStyle = 'white';   
  ctx.stroke();
  
  //Second hand position calculation and drawing it on the canvas 

  var tempSecondsDegrees = ((secondsElapsed * 6 * Math.PI) - 270) / 180;
  var secondHandX = 0 + 200 * Math.cos(tempSecondsDegrees);
  var secondHandY = 0 + 200 * Math.sin(tempSecondsDegrees);

  ctx.beginPath();       
  ctx.moveTo(0, 0);
  ctx.lineTo(secondHandX, secondHandY);
  ctx.strokeStyle = 'black'; 
  ctx.stroke();

  //Reset the matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//Calculate hour, minute and second from current time and pass them as arguments to drawClock function every second

var myInterval = setInterval(function() {
  var myDate = new Date();
  var seconds = myDate.getSeconds();
  var minutes = myDate.getMinutes();
  var hours = myDate.getHours();
  drawClock(seconds, Math.abs(minutes), hours);
}, 1000);