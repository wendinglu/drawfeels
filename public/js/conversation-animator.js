function ConversationAnimator(container, conversation, membersTable, drawingsTable){
  this.container = container;
  this.membersTable = membersTable;
  this.conversation = conversation;
  this.drawingsTable = drawingsTable;
  this.imageIDs = conversation.drawings;
  this.drawingObj = null;
  this.collabStack = [];
}

ConversationAnimator.prototype.initStaticPreview = function() {
  var drawingID = this.imageIDs[this.imageIDs.length - 1];
  var drawing = this.drawingsTable[drawingID];
  var drawingContainer = document.createElement('div');
  var detailSpan = document.createElement('span');
  detailSpan.className = "row";

  var fromSpan = document.createElement('span');

  var descSpan = document.createElement('span');
  descSpan.innerHTML ='<h2 class="inlineText"> drew a </h2><h2 class="inlineText desc">' + drawing.description + '</h2>';

  var toSpan = document.createElement('span');

  var self = this;
  if (this.imageIDs.length > 1) {
    var participants = this.conversation.members;
    participants.forEach(function(val, ind, arr) {
      if (ind == arr.length - 1)
        fromSpan.innerHTML += ('<h2 class="inlineText"> and </h2>');
      var pImg = new Image();
      pImg.className = "circular-med";
      pImg.style.opacity = 1;
      pImg.src = self.membersTable[val].picture;
      fromSpan.appendChild(pImg);

      self.collabStack.push(function(){ return pImg}());
      detailSpan.appendChild(fromSpan);
      detailSpan.appendChild(descSpan);
      detailSpan.appendChild(toSpan);
    });
    descSpan.innerHTML += '<h2 class="inlineText"> together</h2>';
  } else {
    detailSpan.innerHTML += '<img class="circular-med" style="opacity: 1;" src="' + this.membersTable[drawing.from].picture + '"/>';
    descSpan.innerHTML += '<h2 class="inlineText"> for </h2>';
    detailSpan.appendChild(descSpan);
    drawing.to.forEach(function(val, idx, arr){
      detailSpan.innerHTML += '<img class="circular-med" style="opacity: 1;" src="' + self.membersTable[val].picture + '"/>';
    });
  }


  var imgSpan = document.createElement('span');
  imgSpan.class="row section"
  var drawingObj = new Image();
  drawingObj.className = "fit-img";
  drawingObj.src = drawing.url;
  this.drawingObj = drawingObj;
  imgSpan.appendChild(this.drawingObj)
  drawingContainer.appendChild(detailSpan);
  drawingContainer.appendChild(imgSpan);
  this.container.appendChild(drawingContainer);
}

ConversationAnimator.prototype.createStack = function() {
  if (this.imageIDs.length) {
    this.initStaticPreview();    
    var optionsSpan = document.createElement('span');
    optionsSpan.className = "row";

    var lastDrawing = this.drawingsTable[this.imageIDs[this.imageIDs.length - 1]];
    var addButtonSpan = document.createElement('span');
    addButtonSpan.className = "col-xs-8";
    addButtonSpan.innerHTML = '<form name="draw" method="post" action="/draw">' +
                  '<input type="hidden" name="img" value="'+ lastDrawing.url +'">' +
                  '<input type="hidden" name="description" value="'+ lastDrawing.description + '"/>'+
                  '<input type="hidden" name="recipient" value="'+ lastDrawing.from +'"/>' + 
                  '<input type="hidden" name="convoID" value="'+ this.conversation._id +'"/>' +
                  '<button type="submit" class="btn btn-lg btn-default"> Add To Drawing </button>';

    optionsSpan.appendChild(addButtonSpan);

    if (this.imageIDs.length > 1){
      var playButtonSpan = document.createElement('span');
      playButtonSpan.className = "col-xs-4";
      var playButton = document.createElement('button');
      playButtonSpan.appendChild(playButton);
      playButton.className = "btn btn-lg btn-default";
      playButton.innerHTML = "Replay Drawing!";
      optionsSpan.appendChild(playButtonSpan);
      var self = this;
      playButton.onclick = function startAnimation() {
        var i = 0;
        self.drawingObj.src="images/icons/blank.png";
        var animInt = setInterval(function () {
          var currImg = self.drawingsTable[self.imageIDs[i]];
          self.drawingObj.src = currImg.url;
          if (i < self.imageIDs.length-1){
            i++;
          } else {
            clearInterval(animInt);
            lastAuthor.style.border = "none";
            i = 0;
            return false;
          }
        }, 500);
      };
    }

    this.container.appendChild(optionsSpan);
    

  }
}

