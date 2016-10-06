// console.log('Client side js loaded');
$(function() {
    //ask the server for songs, and then draw them
    getSongs();

    //listen for submit envents and send new songs to the server
// for the first 3 will be post
    $('form').on('submit', function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/songs',
            data: formData,
            success: getSongs
        });

        $(this).find('input[type=text]').val('');

        // $('form').submit(function() {
        //   $(this).children('.blank').remove();
        // });


    });



});
//the last one #4 will be GET (from assignment)
//add a gitignore file to homework file// do not add node_modules
function getSongs() {
    $.ajax({
        type: 'GET',
        url: '/songs',
        success: function(songs) {
            $('#songs').empty();
            songs.forEach(function(song) {
                var $li = $('<li></li>');
                $li.append('<p>' + song.title + '</p>');
                $li.append('<p>by: ' + song.artist + '</p>');
                $li.append('<p>' + 'date ' + song.dateAdded + '</p>');
                $('#songs').append($li);
            });

        }
    });
}
