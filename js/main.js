$(function() {
  var pages = $('.pt-page'),
    main = $('#pt-main'),
    control = $('.pt-control'),
    next = $('.pt-next'),
    prev = $('.pt-prev'),
    currentPTIndex = 0,
    animating = false;
  $.each(pages, function(index, ele) {
    var $this = $(ele),
      controlBtn = $('<a href="#">' + index + '</a>').appendTo(control);
  });

  // Default to first page
  $('a', control).eq(0).addClass('active');
  main.addClass('pt-first-page');

  var moveToPage = function(index) {
    var lastPage = $(pages[currentPTIndex]),
      showAnim = 'pt-page-rotateRoomTopIn',
      hideAnim = 'pt-page-rotateRoomTopOut',
      mainClass;

    // Check for animation name
    if (index < currentPTIndex) {
      showAnim = 'pt-page-rotateRoomBottomIn',
      hideAnim = 'pt-page-rotateRoomBottomOut';
    }

    // Set var
    currentPTIndex = index;
    animating = true;

    // Add class to main
    main.removeClass('pt-last-page pt-first-page');
    if (currentPTIndex == 0) {
      mainClass = 'pt-first-page';
    } else if (currentPTIndex == pages.length - 1){
      mainClass = 'pt-last-page';
    }
    main.addClass(mainClass);

    // Animation
    lastPage.addClass(hideAnim);
    $(pages[currentPTIndex]).addClass('pt-page-current pt-page-ontop ' + showAnim);

    // Finish anim
    setTimeout(function() {
      lastPage.removeClass('pt-page-current');
      pages.removeClass('pt-page-ontop ' + showAnim + ' ' + hideAnim);
      animating = false;
    }, 800);
  }

  // Control
  control.on('click', 'a', function(e) {
    e.preventDefault();
    var $this = $(this);
    if (!$this.hasClass('active') || animating) {
      moveToPage($this.index());
    }
    $(control).find('a').removeClass('active');
    $this.addClass('active');
  });

  // Arrows
  next.click(function(e) {
    e.preventDefault();
    if (!animating) {
      if (currentPTIndex <= pages.length - 2) {
        $(control).find('a').eq(currentPTIndex + 1).click();
      } else {
        $(control).find('a:first').click();
      }
    }
  });
  prev.click(function(e) {
    e.preventDefault();
    if (!animating) {
      if (currentPTIndex >= 1) {
        $(control).find('a').eq(currentPTIndex - 1).click();
      } else {
        $(control).find('a:last').click();
      }
    }
  });

  // Mouse
  main.on('mousewheel', function(event) {
    if (event.deltaY > 0) {
    	prev.click();
    } else {
    	next.click();
    }
  });
});
