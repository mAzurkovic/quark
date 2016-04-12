var ipc = require('ipc');
var shell = require('shell');

var usrField = document.getElementById('inputField');

document.getElementById('display').style.display = 'none';

usrField.onkeyup = function() {

  document.getElementById('display').style.display = 'block';
  if (document.getElementById('inputField').value.length > 2) {
    document.getElementById('startDisplayDiv').style.display = 'none';
    document.getElementById('displayDiv').style.display = 'block';
  } else {
    document.getElementById('startDisplayDiv').style.display = 'block';
    document.getElementById('displayDiv').style.display = 'none';
  }
  // GOTO a website that the user has entered...
  if (usrField.value.indexOf("/") > -1) {
    document.getElementById('display').innerHTML = "www." + "<span style='background-color: yellow;'>" + usrField.value.replace('/', '') + "</span>" + ".com";
  }
  else {
    document.getElementById('display').innerHTML = usrField.value;
  }

}

function query(val) {
  shell.openExternal("https://www.google.ca/?gfe_rd=cr&ei=5NnpVfajF4qV8QfglLCQBg&gws_rd=ssl#q=" + val);
}

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
