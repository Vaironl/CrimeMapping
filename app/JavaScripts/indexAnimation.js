// A $( document ).ready() block.
$(document).ready(function () {
    var sidenavHidden = false;

    $(".sidenav").delay(200).fadeIn(0);
    $(".sidenav").click(function () {
        if (sidenavHidden) {
            // $(".sidenav").slideDown(800);
            sidenavHidden = !sidenavHidden;
        } else {
            $(".sidenav").slideToggle("slow");
            sidenavHidden = !sidenavHidden;
        }
    });

});