$(document).ready () ->
  alert "test"
  
  $("#loginForm").submit () ->
    url = "users/validate"
    $.ajax
      type: "POST"
      url: url
      data: $("#loginForm").serialize()
      success: (data) ->
        alert(data)

    return false