$(document).ready(function() {
  $('.profile-box').click(function() {
    $(this).addClass('active');
    window.location = 'chooseMember?id=' + $(this).data('id').replace(/\"/g, "");
  });

  $('.profile-box').mouseenter(function() {
    $(this).addClass('active');
  });

  $('.profile-box').mouseleave(function() {
    $(this).removeClass('active');
  });
});