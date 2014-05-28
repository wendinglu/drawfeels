$(document).ready(function() {
  $('.profile-box').click(function() {
    debugger;
    window.location = 'chooseMember?id=' + $(this).data('id').replace(/\"/g, "");
  });

  $('.profile-box').mouseenter(function() {
    $(this).addClass('active');
  });

  $('.profile-box').mouseleave(function() {
    $(this).removeClass('active');
  });
});