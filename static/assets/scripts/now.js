function styledLog(message, style) {
  console.log(`%c${message}`, style)
}

// Made by discord.gg/interstellar
// Credits to @xbubbo and @xderpman on Discord
// You can use this code with proper credits.

var adjustmentCompleted = false
var attempts = 0

function adjustElements() {
  if (adjustmentCompleted) {
    console.log('%cNow.GG Adjustment already completed. Stopping script.', 'font-size: 15px; color: green;')
    return true
  }

  var iframe = top.document.getElementById('iframeId')

  if (iframe) {
    var innerDoc = iframe.contentWindow.document

    var roblox = innerDoc.getElementById('js-game-video')
    var controlBar = innerDoc.getElementById('ng-control-bar')
    var fullscreen = innerDoc.getElementById('ng-fs') || innerDoc.querySelector('.sc-kOcGyv.dkAhwC')

    if (roblox && controlBar) {
      roblox.style.top = null
      roblox.style.marginTop = '110%'
      controlBar.style.top = '91%'
      console.log('%cSuccessfully adjusted Now.GG.', 'font-size: 15px; color: green;')

      if (fullscreen) {
        // Remove any existing event listeners before adding a new one
        fullscreen.removeEventListener('mousedown', fullscreenClickHandler)

        // Add the event listener
        fullscreen.addEventListener('mousedown', fullscreenClickHandler)
      } else {
        console.log('%cFullscreen button not found.', 'font-size: 15px; color: red;')
      }

      adjust()

      return true
    } else {
      console.log('%cFailed to find elements (roblox or controlBar).', 'font-size: 15px; color: red;')
      return false
    }
  } else {
    console.log('%cFailed to find iframe with the specified ID.', 'font-size: 15px; color: red;')
    return false
  }
}

function CheckAndAdjust() {
  var intervalId = setInterval(function () {
    RunTopLogs()
    attempts++
    if (adjustElements()) {
      clearInterval(intervalId)
    } else if (attempts >= 30) {
      console.log(
        '%cNow.GG Script ran 30 times without finding elements. Stopping script.',
        'font-size: 15px; color: red;'
      )
      clearInterval(intervalId)
    }
  }, 5000)
}

function adjust() {
  setInterval(function () {
    var iframe = top.document.getElementById('iframeId')

    if (iframe) {
      var innerDoc = iframe.contentWindow.document

      var roblox = innerDoc.getElementById('js-game-video')
      var controlBar = innerDoc.getElementById('ng-control-bar')
      var customClassElement = innerDoc.querySelector('.sc-rUGft.hLgqJJ')

      if (roblox) {
        checkAndAdjustStyles(roblox, 'marginTop', ['110%'])
      }

      if (controlBar) {
        checkAndAdjustStyles(controlBar, 'top', ['91%'])
      }

      if (customClassElement) {
        customClassElement.remove()
        console.log('%cRemoved class "sc-rUGft hLgqJJ".', 'font-size: 15px; color: green;')
      }
    } else {
      console.log('%cFailed to find iframe with the specified ID.', 'font-size: 15px; color: red;')
    }
  }, 3000)
}

function checkAndAdjustStyles(element, property, targetValues) {
  if (element) {
    var currentStyle = window.getComputedStyle(element)[property]

    if (!targetValues.includes(currentStyle)) {
      element.style[property] = targetValues[0]
      console.log(`%cAdjusted ${property} to ${targetValues[0]}.`, 'font-size: 15px; color: green;')
    }
  } else {
    console.log('%cElement is null. Skipping check and adjustment.', 'font-size: 15px; color: red;')
  }
}

function RunTopLogs() {
  console.log(
    '%cdiscord.gg/interstellar',
    'font-weight: bold; font-size: 39px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38), 6px 6px 0 rgb(226,91,14), 9px 9px 0 rgb(245,221,8), 12px 12px 0 rgb(5,148,68), 15px 15px 0 rgb(2,135,206), 18px 18px 0 rgb(4,77,145), 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;'
  )
}

var heightAdjusted = false

function fullscreenClickHandler(event) {
  if (event.detail > 1) {
    event.preventDefault()
    return
  }

  console.log('%cFullscreen button clicked.', 'font-size: 15px; color: orange;')

  console.log('%cAdjusting height to 110%...', 'font-size: 15px; color: orange;')

  var iframe = top.document.getElementById('iframeId')
  if (iframe) {
    var innerDoc = iframe.contentWindow.document
    var roblox = innerDoc.getElementById('js-game-video')

    setTimeout(function () {
      if (roblox) {
        roblox.style.top = null
        roblox.style.marginTop = '110%'
        console.log('%cHeight adjusted to 110%.', 'font-size: 15px; color: green;')
        heightAdjusted = true
      }
    }, 3000)
  }

  var fullscreen = innerDoc.getElementById('ng-fs') || innerDoc.querySelector('.sc-kOcGyv.dkAhwC')
  if (fullscreen) {
    fullscreen.removeEventListener('mousedown', fullscreenClickHandler)

    if (!heightAdjusted) {
      fullscreen.addEventListener('mousedown', fullscreenClickHandler)
    }
  }
}

CheckAndAdjust()
console.log('%cNow.GG Adjustment script started. Checking every 5 seconds.', 'font-size: 15px; color: blue;')
