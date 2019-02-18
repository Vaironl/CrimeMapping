// A $( document ).ready() block.
// $(document).ready(function () {
//     var sidenavHidden = true;
//     $(".sidenav-arrow").click(function () {
//         if (sidenavHidden) {
//             $(".sidenav").animate({width: '20px'}, 350);
//             $(".sidenav-arrow").css({'left':'20px'});
//             $(".sidenav-arrow").html('<h1> < </h1>');
//             sidenavHidden = !sidenavHidden;
//         } else {
//             $(".sidenav").animate({width: '160px'}, 350);
//             $(".sidenav-arrow").css({'left':'155px'},350);
//             $(".sidenav-arrow").css({'opacity':'1'});
//             $(".sidenav-arrow").html('<h1> > </h1>');
//             sidenavHidden = !sidenavHidden;
//         }
//     });
//
//
// });

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}