chrome.runtime.onInstalled.addListener(function(details){
    var defaultSettings = {
		censorCharacter: "****",
		filterMethod: "1",
		filterToggle: true,
		matchMethod: "0",
		password: "null", 
		warningDomains: [
			"https://www.facebook.com",
			"https://www.twitter.com",
			"https://www.9gag.com",
			"https://www.tumblr.com",
			"https://www.youtube.com",
			"https://m.youtube.com"
		],
			"websites": [
			{"count": "3358","site": "https://www.google.com.ph"},
			{"count": "249","site": "https://notifications.google.com"},
			{"count": "143","site": "https://www.youtube.com"},
			{"count": "128","site": "https://www-urbandictionary-com.cdn.ampproject.org"},
			{"count": "118","site": "https://stackoverflow.com"}
			]
	}

    if(details.reason == "install"){
       chrome.storage.sync.set(defaultSettings, function() {
      	console.log("Extension successfully installed");
    });
    }
});

chrome.runtime.onInstalled.addListener(function() {
	
    
  });