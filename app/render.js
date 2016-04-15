var ipc = require('ipc');
var shell = require('shell');

var usrField = document.getElementById('inputField');
var value = document.getElementById('inputField').value;

var site = null;
var siteSearch = null;
var inputState = 0;

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
      site = siteName.replace("/", "");
      siteSearch = usrField.value.replace(siteName, "");
      document.getElementById('display').innerHTML = siteName.replace("/", "") + ":        " + "<span style='background-color: orange;'>" + usrField.value.replace(siteName, "") + "</span>";
      inputState = 2;
    } else {
      document.getElementById('display').innerHTML = "www." + "<span style='background-color: yellow;'>" + usrField.value.replace("/", "") + "</span>" + ".com";
      inputState = 1;
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

//------------------------------//
// Search States:               //
// 0 : Search Google/Bing/etc.  //
// 1 : Go to the deired website //
// 2 : Search the website       //
//------------------------------//

function querySite(name, query) {
  if (name == "reddit" || name == "Reddit") {
    shell.openExternal("https://reddit.com/search?q=" + query);
  }
}

// Default search Google method
function search(ele) {
  if (event.keyCode == 13) {
    var usrQuery = ele.value;

    if (inputState == 1) {
      shell.openExternal("https://www." + usrQuery.replace('/', '') + ".com");
    } else if (inputState == 2) {
      querySite(site, siteSearch);
    } else {
      query(usrQuery);
    }
  }
}
