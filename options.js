function filterMethodSelect(event){
    chrome.storage.sync.set({filterMethod: event.target.value}, function(){
    console.log("Filter Method: "+event.target.value);
   });
}

function filterMethod(){
  chrome.storage.sync.get(['filterMethod'], function(word){
      console.log(word.filterMethod);
  });
}

function censorCharacterSelect(event){
	chrome.storage.sync.set({censorCharacter: event.target.value},function(){
		console.log("Censor Character: "+event.target.value);
	});
}

function matchMethodSelect(event){
	chrome.storage.sync.set({matchMethod: event.target.value},function(){
		console.log("matchMethod: "+event.target.value);
	});
}

// filterMethod(); 

//Listeners   
document.getElementById('matchMethodSelect').addEventListener('change',matchMethodSelect);
document.getElementById('censorCharacterSelect').addEventListener('change',censorCharacterSelect);
document.getElementById('filterMethodSelect').addEventListener('change', filterMethodSelect);