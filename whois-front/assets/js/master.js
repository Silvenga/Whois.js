$(document).ready(function () {

    // Make the header look nice
    $(".header").fitText(0.8);
    $(".search").fitText(1.6);

    // Use ajax for all forum posts
    $("#search-form").submit(function (e) {
        e.preventDefault();
        query();
    });
});

function query() {

    $('html, body').animate({ 'scrollTop': 0 });
    $("#results").fadeOut(200);

    hideHead();

    // Post using the forum data
    $.ajax({
        type: $("#search-form").attr('method'),
        url: $("#search-form").attr('action'),
        data: $("#search-form").serialize(),
        success: function(data) {

            $("#results").text(data);
            $("#results").fadeIn(200);
        }
    });
}

function hideHead() {

    $("#head").addClass("small-head");
    $("#search-form").addClass("small-search");
}