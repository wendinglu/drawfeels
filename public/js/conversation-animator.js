function ConversationAnimator(container, conversation, membersTable, drawingsTable){
  this.container = container;
  this.membersTable = membersTable;
  console.log(this.membersTable);
  this.conversation = conversation;
  this.drawingsTable = drawingsTable;
  this.imageIDs = conversation.drawings;
  this.stack = [];
}

//things I have to do: render the UI; create the visual for just one element, each subsequent element has a greater z index
//create one UI thing per element in the array of members

ConversationAnimator.prototype.createDrawingDiv = function(drawingID) {
  var drawing = this.drawingsTable[drawingID];
  var detailSpan = document.createElement('span');
  detailSpan.className = "row";

  //var detailSpan = document.createElement('span'); add the grid columns
  var fromSpan = document.createElement('span');
  fromSpan.className = "col-xs-2";
  fromSpan.innerHTML = '<img class="circular-small" style="opacity: 1;" src="' + this.membersTable[drawing.from].picture + '"/>';
  
  var desciptorSpan = document.createElement('span');
  desciptorSpan.className = "col-xs-4";
  desciptorSpan.innerHTML ='<h2 class="inlineText"> drew </h2><h2 class="inlineText desc">' + drawing.description + '</h2><h2 class="inlineText"> for </h2>';

  var toSpan = document.createElement('span');
  toSpan.className = "col-xs-4";
  var self = this;
  drawing.to.forEach(function(val, idx, arr){
    toSpan.innerHTML += '<img class="circular-small" style="opacity: 1;" src="' + self.membersTable[val].picture + '"/>';
  });

  detailSpan.appendChild(fromSpan);
  detailSpan.appendChild(desciptorSpan);
  detailSpan.appendChild(toSpan);


  //APPEND FROMSPAN, DESCSPAN and TOSPAN TO DETAIL SPAN
  var imgSpan = document.createElement('span');
  imgSpan.class="row section"
  imgSpan.innerHTML = '<span class="col-xs-12"><img class="fit-img" src="'+ drawing.url +'"/>';
  //drawingDiv.appendChild(detailSpan);
  //drawingDiv.appendChild(imgSpan);
  this.container.appendChild(detailSpan);
  this.container.appendChild(imgSpan);
}

ConversationAnimator.prototype.createStack = function() {
  if (this.imageIDs.length) {
    var self = this;
    this.imageIDs.forEach(function(val, ind, arr){
      self.createDrawingDiv(val, ind);
    });
    var addSpan = document.createElement('span');
    addSpan.className = "row";

    var lastDrawing = this.drawingsTable[this.imageIDs[this.imageIDs.length - 1]];
    console.log("this convo id");
    console.log(this.conversation._id);
    var buttonSpan = document.createElement('span');
    buttonSpan.className = "col-xs-12";
    buttonSpan.innerHTML = '<form name="draw" method="post" action="/draw">' +
                  '<input type="hidden" name="img" value="'+ lastDrawing.url +'">' +
                  '<input type="hidden" name="description" value="'+ lastDrawing.description + '"/>'+
                  '<input type="hidden" name="recipient" value="'+ lastDrawing.from +'"/>' + 
                  '<input type="hidden" name="convoID" value="'+ this.conversation._id +'"/>' +
                  '<button type="submit" class="btn btn-lg btn-default"> Add To Drawing </button>';
    this.container.appendChild(buttonSpan);
  }
}
                
