$(document).ready(function() {
  $("#loginForm").submit(function() {
    var url;
    url = "validate";
    $.ajax({
      type: "POST",
      url: url,
      data: $("#loginForm").serialize(),
      success: function(data) {
        return alert(data);
      }
    });

    alert("Wrong username or password");
    return false;
  });

  $("#newUserForm").submit(function() {
    var url;
    url = "create";
    $.ajax({
      type: "POST",
      url: url,
      data: $("newUserForm").serialize(),
      success: function(data) {
        return alert(data);
      }
    });

    alert("Could not create this user");
    return false;
  });
});
