// // sidebar toggle
// $(function () {
//   jQuery("#nav-icon").click(function () {
//   jQuery(this).toggleClass("open");
//   jQuery("body").toggleClass("menu-open");
// });
// jQuery(".overlay-close").click(function () {
//   jQuery("#nav-icon").removeClass("open");
//   jQuery("body").removeClass("menu-open");
//   jQuery("body").removeClass("dropdown-open");
// });
// });

// $("body").on("click", ".dropdown-menu", function () {
//   jQuery("body").removeClass("menu-open");
//   jQuery("#nav-icon").removeClass("open");
// });

// // expand file
$(function () {
  $(".expand-list").click(function () {
    $(".fml-report-wrapper").addClass("expand");
    $(".gettomenus").addClass("custom-scroll-long1");
    $(this).remove();
  });
});

// add remoev class on fml sidebar menu
// $(function () {
//   $(window).on("scroll", function () {
//     var WindowTop = $(window).scrollTop();
//     $(".section_break").each(function (i) {
//       if (
//         WindowTop > $(this).offset().top - 100 &&
//         WindowTop < $(this).offset().top + $(this).outerHeight(true)
//       ) {
//         $(".gettomenus > ul > li > a").removeClass("active-menu");
//         $(".gettomenus li").eq(i).find("a").addClass("active-menu");
//       }
//     });
//   });
// });

// fixed fml sidebar
// if (document.getElementById("sticky")) {
//   window.onscroll = function () {
//     myFunction();
//   };
//   var header = document.getElementById("sticky");
//   var sticky = header.offsetTop;
//   function myFunction() {
//     if (window.pageYOffset > sticky) {
//       $(".gettomenus").addClass("custom-scroll-long");
//     } else {
//       $(".gettomenus").removeClass("custom-scroll-long");
//     }
//   }
// }

var sections = document.getElementsByClassName("section_break");
window.addEventListener("scroll", navHighlighter);
function navHighlighter() {
  let scrollY = window.pageYOffset;
  for (var i = 0; i < sections.length; i++) {
    let j = i + 1;

    const sectionTop = sections[i].offsetTop - 50;
    const sectionHeight = sections[i].offsetHeight;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const boxes = document.querySelectorAll(".gettomenus > ul > li > a");

      boxes.forEach((box) => {
        box.classList.remove("active-menu");
      });

      document
        .querySelector(".gettomenus > ul > li:nth-child(" + j + ") > a")
        .classList.add("active-menu");
    }
  }
}
