
$(document).ready(function ($) {

    // Counter
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Flip JS
 $(function() {
    var $cells = $('.customers-grid-cell')
    $cells.flip({trigger: 'manual', axis: 'x'}).css('display', 'inline-block')
    startFlip()
  })

  var recentIdxs = [29,33,4,49,68,52,15,70]

  var flipInterval;

  function startFlip() {
    window.clearInterval(flipInterval);
    flipInterval = window.setInterval(_flipCells, 6000);
  }
  function stopFlip() {
    window.clearInterval(flipInterval);
  }

  if(window.addEventListener) {
    window.addEventListener('focus', startFlip);
    window.addEventListener('blur', stopFlip);
  } else { // IE8
    window.attachEvent("focus", startFlip);
    window.attachEvent("blur", stopFlip);
  }

  function _flipCells() {
    $('.customers-grid-cell').each(function(i) {
      var $cell = $(this)
      setTimeout(function() {
        _flipCell($cell)
      }, i * 50)
    })
  }

  function _flipCell($cell) {
    // Prevent browser from buffering animations while the window is inactive
    $cell.stop(true,true);
    $cell.find('.front, .back').stop(true,true);

    var nextIdx = _getCustomerImageIndex()
    var nextX = nextIdx * -125

    $cell.attr('data-image-idx', nextIdx)

    var flipData = $cell.data("flip-model");
    if (flipData.isFlipped) {
      $cell.find('.front').css('background-position', nextX+'px 0')
    } else {
      $cell.find('.back').css('background-position', nextX+'px 0')
    }

    // Keep 40 most recent customer icons in memory
    recentIdxs.push(nextIdx)
    recentIdxs = recentIdxs.slice(-40)

    $cell.flip('toggle')
  }

  // Exclude visible images
  function _getCustomerImageIndex() {
    var validIdxs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]

        validIdxs = $(validIdxs).not(recentIdxs).get();

    return validIdxs[Math.floor(Math.random() * validIdxs.length)]
  }


});
