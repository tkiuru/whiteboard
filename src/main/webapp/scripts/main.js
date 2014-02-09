require.config({
  baseUrl: 'scripts/lib',
  paths: {
    jquery: 'jquery'
  }
});
require(["scripts/lib/bacon.jquery.js", "jquery"], function() {
  var canvas = document.getElementById("whiteboard-canvas")
  var body = document.body

  setInterval(function() {
    var changes =  Bacon.$.ajax({ url: "http://localhost:8080/changes"}).filter(function(response) { return response != ""}).toProperty()
    changes.onValue(function(response) {
      typeChanges(JSON.parse(response))
    })
  }, 500);

  canvas.addEventListener('mouseup', function(event) {
    var position = clickPosition(canvas, event)
    body.addEventListener('keyup', keyboardListener(position, 0))
  })

  var keyboardListener = function(startingPosition, keycount) {
    var handler = function(event) {
      canvas.addEventListener('mouseup', function (event) {
        body.removeEventListener('keyup', handler)
      })
      keycount++
      var key =  String.fromCharCode(event.keyCode)
      var position = currentPosition(startingPosition, keycount)
      var context = canvas.getContext("2d")
      context.fillText(key, position.x, position.y)
      sendChange(position, key)
    }
    return handler
  }

  function clickPosition(canvas, event) {
    var boxLocation = canvas.getBoundingClientRect()
    return {
      x: event.clientX - boxLocation.left,
      y: event.clientY - boxLocation.top
    }
  }

  function currentPosition(position,keycount) {
    var boxLocation = canvas.getBoundingClientRect()
    return {
      x: position.x + keycount * 10,
      y: position.y
    }
  }

  function sendChange(position, key) {
    Bacon.$.ajax({ url: "http://localhost:8080/addition/" +
      position.x + "/" + position.y + "/" + key})
  }

  function typeChanges(changes) {
    var context = canvas.getContext("2d")
    changes.forEach(function(element) {
      context.fillText(element.text, element.positionX, element.positionY)
    })
  }
})
