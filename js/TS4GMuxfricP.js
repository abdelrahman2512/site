/*------------------------------------
    هذا المجلد حق تنسيقات js
-------------------------------------- */
/*------------------------------------
    التنسيق
-------------------------------------- */
$(window).on('load', function () {
  $('.lds-ellipsis').fadeOut(); // تحميل رسوم متحركة
  $('.preloader').delay(333).fadeOut('slow'); 
  $('body').delay(333);
});

/*------------------------------------
    بدء رأس ثابت
-------------------------------------- */
window.onscroll = function () { fixedHeader() };

var header = document.querySelector("header");
var sticky = document.querySelector(".about").offsetTop;

function fixedHeader() {
  if (window.pageYOffset > sticky - 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


/*------------------------------------
    قائمة تنقل 
-------------------------------------- */
var ul = document.querySelector(".nav");
function nav() {
  if (ul.style.display === "flex") {
    header.style.background = "rgba(0, 0, 0, 0)";
    ul.style.top = "-100vh";
    setTimeout(() => { ul.style.display = "none"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  } else {
    header.style.background = "rgba(0, 0, 0, 0.70)"
    ul.style.display = "flex";
    setTimeout(() => { ul.style.top = "72px"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  }
}

var x = window.matchMedia("(max-width: 767px)")
function closeNav() {
  if (x.matches) { // If media query matches
    header.style.background = "rgba(0, 0, 0, 0)";
    ul.style.top = "-100vh";
    setTimeout(() => { ul.style.display = "none"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  }
}
//****************************************
$(document).ready(function () {
  $('.filter li').click(function () {
    $('.filter li').removeClass('active');
    $(this).addClass('active');
  });
  var filterizd = $('.filtr-container').filterizr();
});
//****************************************

var $navigationLinks = $('header ul li a');
var $navigationLists = $('header ul li');
// ذاكرة التخزين المؤقت (بترتيب معكوس) الأقسام
var $sections = $($("section").get().reverse());

// تعيين معرف كل قسم إلى رابط التنقل المقابل .
var sectionIdTonavigationLink = {};
$sections.each(function () {
  var id = $(this).attr('id');
  sectionIdTonavigationLink[id] = $('header ul li a[href=\\#' + id + ']');
});

// وظيفة الخانق ، تفرض حدًا أدنى من الفاصل الزمني .
function throttle(fn, interval) {
  var lastCall, timeoutId;
  return function () {
    var now = new Date().getTime();
    if (lastCall && now < (lastCall + interval)) {
      // إذا كنا داخل الفترة الفاصلة فإننا ننتظر
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        lastCall = now;
        fn.call();
      }, interval - (now - lastCall));
    } else {
      lastCall = now;
      fn.call();
    }
  };
}

function highlightNavigation() {
  var scrollPosition = $(window).scrollTop();

// الاقسام
  $sections.each(function () {
    var currentSection = $(this);
    // موقع القسم .
    var sectionTop = currentSection.offset().top;

    // إذا كان المستخدم قد تم تمريره فوق الجزء العلوي من القسم.
    if (scrollPosition >= sectionTop - 110) {
      var id = currentSection.attr('id');
      
      var $navigationLink = sectionIdTonavigationLink[id];
      if (!$navigationLink.hasClass('active')) {
        $navigationLinks.removeClass('active');
        $navigationLink.addClass('active');
      }
      return false;
    }
  });
}
$(window).scroll(throttle(highlightNavigation, 100));