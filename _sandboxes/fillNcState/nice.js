var x = 10;
var interval = null;
$(document).on('ready', function() {
  interval = setInterval(myfunction, 5000);
});

function myfunction(){
  if (x > 40) {
    // it stops after printing 60
    clearInterval(interval);
  }
  $('.filled').css('height', x + 'px');
  $('.filled').css('transition', 'height 1s ease');
  x = x + 10;
  console.log(x);
}