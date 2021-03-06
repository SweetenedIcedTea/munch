window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var closeBtn = document.getElementById('close');
  var nextId = 0


  var socket = new WebSocket('wss://domainofthebones.com/rest');

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
  };

  // Handle any errors that occur.
  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };

  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    var i;
    var message = event.data;
    //messagesList.innerHTML += 'recieved: ' + message + '<p>';
    let jsonObj = JSON.parse(message);

    var div = document.createElement("div");
    div.setAttribute('class', 'order');
    div.setAttribute('id', nextId);

    div.innerHTML += '<div style = "width: 250px; background-color: #484864">' + '<div style = "float: right">' + "$" + jsonObj.price.toFixed(2) + '</div>' + jsonObj.name + ' ---- Table ' + jsonObj.table +  '</div>' + '<br />';
    for (i = 0; i < jsonObj.items.length; i++) {
      div.innerHTML += jsonObj.items[i].quantity + 'x ' + jsonObj.items[i].item + ' ($' + jsonObj.items[i].price.toFixed(2)  + ' ea.)' + '<br />';
    }
    div.innerHTML += '<div style = "float: right"> <a href = "javascript:document.getElementById(\'' + nextId.toString() + '\').setAttribute(\'class\', \'done\')"> Complete </a></div>'
    nextId++;
    document.getElementById("main").appendChild(div);
  };


  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket Server.';
    socketStatus.className = 'closed';
  };


  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // Close the WebSocket.
    socket.close();

    return false;
  };

};
