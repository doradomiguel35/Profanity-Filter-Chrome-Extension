// function toggleFilter(){
// 	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
//     var activeTab = tabs[0];
//     chrome.tabs.getSelected(null, function(tab) {
// 	  var code = 'window.location.reload();';
// 	  chrome.tabs.executeScript(tab.id, {code: code});
// 	});

//     chrome.tabs.sendMessage(activeTab.id, {"message": "filter"});
// 	});
// }


// document.getElementById('toggleFilter').addEventListener('change',)
document.getElementById('options').addEventListener('click', function() {chrome.runtime.openOptionsPage(); });