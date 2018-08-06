function toggleFilter(){
	var toggleFilterchecked = document.getElementById('toggleFilter').checked;
	
	if(toggleFilterchecked){
		chrome.storage.sync.set({filterToggle: toggleFilterchecked},function(){
			// document.getElementById('toggleFilter').checked;
			console.log("Toggle state is "+toggleFilterchecked);
			chrome.tabs.reload();
		});
	}
	else{
		chrome.storage.sync.set({filterToggle: toggleFilterchecked},function(){
			// document.getElementById('toggleFilter');
			console.log("Toggle state is "+toggleFilterchecked);
			chrome.tabs.reload();
		});
	}
}

function checkToggle(){
	chrome.storage.sync.get(['filterToggle'],function(result){
		var toggle = result.filterToggle;
		if(toggle === true){
			 document.getElementById('toggleFilter').checked;
		}
		else{
			document.getElementById('toggleFilter');
		}
	});
}
// checkToggle();
	
document.getElementById('toggleFilter').addEventListener('change',toggleFilter);
document.getElementById('options').addEventListener('click', function() {chrome.runtime.openOptionsPage(); });