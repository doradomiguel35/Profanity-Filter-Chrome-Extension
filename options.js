var filterMethods = ["Censor", "Substitute", "Remove"];
var config = {};

function filterMethodSelect(event) {
  config.filterMethod = document.getElementById('filterMethodSelect').selectedIndex;
  saveOptions(event, config);
}

function activate(element) {
  element.classList.add('active');
}

function deactivate(element) {
  element.classList.remove('active ');
}

function show(element) {
  element.classList.remove('hidden');
  element.classList.add('visible');
}

function hide(element) {
  element.classList.remove('visible');
  element.classList.add('hidden');
}

// Switching Tabs
function openTab(event) {
  // Don't run on current tab
  if ( event.currentTarget.className.indexOf('active') >= 0) {
    return false;
  }

  // Set active tab
  oldTab = document.getElementsByClassName("tablinks active")[0];
  deactivate(oldTab);
  activate(event.currentTarget);

  // Show active tab content
  oldTabContent = document.getElementsByClassName("tabcontent visible")[0];
  hide(oldTabContent);
  newTabName = event.currentTarget.innerText;
  show(document.getElementById(newTabName));
}

//Listeners
tabs = document.getElementsByClassName("tablinks");
for (i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function(e) { openTab(e); });
}

document.getElementById('filterMethodSelect').addEventListener('change', filterMethodSelect);