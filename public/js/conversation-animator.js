function ConversationAnimator(container, conversation, membersTable, drawingsTable){
  this.container = container;
  this.membersTable = membersTable;
  console.log(this.membersTable);
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
  fromSpan.className = "col-xs-2";

  var descSpan = document.createElement('span');
  descSpan.className = "col-xs-4";
  descSpan.innerHTML ='<h2 class="inlineText"> drew a </h2><h2 class="inlineText desc">' + drawing.description + '</h2>';

  var toSpan = document.createElement('span');
  toSpan.className = "col-xs-6";

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
      self.collabStack.push(pImg);
    });
    fromSpan.className = "col-xs-4";
    descSpan.innerHTML += '<h2 class="inlineText"> together</h2>';
    descSpan.className = "col-xs-8";
  } else {
    fromSpan.innerHTML = '<img class="circular-med" style="opacity: 1;" src="' + this.membersTable[drawing.from].picture + '"/>';
    descSpan.innerHTML += '<h2 class="inlineText"> for </h2>';
    drawing.to.forEach(function(val, idx, arr){
      toSpan.innerHTML += '<img class="circular-med" style="opacity: 1;" src="' + self.membersTable[val].picture + '"/>';
    });
  }
  
  detailSpan.appendChild(fromSpan);
  detailSpan.appendChild(descSpan);
  detailSpan.appendChild(toSpan);


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
    var addSpan = document.createElement('span');
    addSpan.className = "row";

    var lastDrawing = this.drawingsTable[this.imageIDs[this.imageIDs.length - 1]];
    console.log("this convo id");
    console.log(this.conversation._id);
    var addButtonSpan = document.createElement('span');
    addButtonSpan.className = "col-xs-12";
    addButtonSpan.innerHTML = '<form name="draw" method="post" action="/draw">' +
                  '<input type="hidden" name="img" value="'+ lastDrawing.url +'">' +
                  '<input type="hidden" name="description" value="'+ lastDrawing.description + '"/>'+
                  '<input type="hidden" name="recipient" value="'+ lastDrawing.from +'"/>' + 
                  '<input type="hidden" name="convoID" value="'+ this.conversation._id +'"/>' +
                  '<button type="submit" class="btn btn-lg btn-default"> Add To Drawing </button>';
    var playButtonSpan = document.createElement('span');
    var playButton = document.createElement('button');
    playButtonSpan.appendChild(playButton);
    playButton.className = "btn btn-lg btn-default";
    playButton.innerHTML = "See what they added!";

    this.container.appendChild(addButtonSpan);
    this.container.appendChild(playButtonSpan);
    var self = this;

    playButton.onclick = function startAnimation() {
      var i = 0;
      var lastAuthor = self.collabStack[0];
      self.drawingObj.src="images/icons/blank.png";
      var animInt = setInterval(function () {
        var currImg = self.drawingsTable[self.imageIDs[i]];
        self.drawingObj.src = currImg.url;
        lastAuthor.style.border = "none";
        console.log(self.conversation.members.indexOf(currImg.from));
        lastAuthor = self.collabStack[self.conversation.members.indexOf(currImg.from)];
        lastAuthor.style.border = "2px solid red";
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
}

