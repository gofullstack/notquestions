jQuery(document).ready(function ($) {
    var learnMore = $(".learn_more");

    learnMore.hide();
    $("#learn_more_button").css({ display: "block" }).click(function () {
        learnMore.slideToggle();
        $(this).toggleClass("less");
        return false;
    });

    $(".entry_time").prettyDate();
});
