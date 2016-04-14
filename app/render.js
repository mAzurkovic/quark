var ipc = require('ipc');
var shell = require('shell');

var usrField = document.getElementById('inputField');
var value = document.getElementById('inputField').value;

document.getElementById('display').style.display = 'none';

usrField.onkeyup = function() {
  // Set default visibility of net display to visible
  document.getElementById('display').style.display = 'block';
  // Check which panel to show
  if (document.getElementById('inputField').value.length > 1) {
    removeDiv('startDisplayDiv');
    displayDiv('displayDiv');
  } else {
    displayDiv('startDisplayDiv');
    removeDiv('displayDiv');
  }
  // GOTO a website that the user has entered...
  if (usrField.value.indexOf("/") > -1) {
    if (usrField.value.indexOf(" ") > -1) {
      var haltIndex = usrField.value.indexOf(' ');
      var lastIndex = value.indexOf(value.substring(value.length-1, value.length));
      var siteName = usrField.value.substring(0, haltIndex);
      document.getElementById('display').innerHTML = siteName.replace("/", "") + ":        " + "<span style='background-color: orange;'>" + usrField.value.replace(siteName, "") + "</span>";
    } else {
    document.getElementById('display').innerHTML = "www." + "<span style='background-color: yellow;'>" + usrField.value.replace("/", "") + "</span>" + ".com";
    }
  } else {
    document.getElementById('display').innerHTML = usrField.value;
  }
}

function removeDiv(div) {
  document.getElementById(div).style.display = 'none';
}

function displayDiv(div) {
  document.getElementById(div).style.display = 'block';
}

function query(val) {
  shell.openExternal("https://www.google.ca/?gfe_rd=cr&ei=5NnpVfajF4qV8QfglLCQBg&gws_rd=ssl#q=" + val);
}

// Default search Google method
function search(ele) {
  if (event.keyCode == 13) {
    var usrQuery = ele.value;
    if (usrQuery.indexOf("/") > -1) {
      shell.openExternal("https://www." + usrQuery.replace('/', '') + ".com");
    }
    else {
      query(usrQuery);
    }
  }
}
