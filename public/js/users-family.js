$(document).ready(function() {
  $('.profile-box').click(function() {
    debugger;
    window.location = 'chooseMember?id=' + $(this).data('id').replace(/\"/g, "");
  });
});