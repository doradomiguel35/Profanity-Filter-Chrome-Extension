chrome.runtime.onInstalled.addListener(function(details){
    var defaultSettings = {
		censorCharacter: "****",
		filterMethod: "0",
		filterToggle: false,
		matchMethod: "0",
		password: "null", 
		warningDomains: [
			"https://www.facebook.com",
			"https://www.twitter.com",
			"https://www.9gag.com",
			"https://www.tumblr.com",
			"https://www.youtube.com",
		],
		websites: [
			{"count": "3358","site": "https://www.google.com.ph"},
			{"count": "249","site": "https://notifications.google.com"},
			{"count": "143","site": "https://www.youtube.com"},
			{"count": "128","site": "https://www-urbandictionary-com.cdn.ampproject.org"},
			{"count": "118","site": "https://stackoverflow.com"}
			],
		defaultWord: [
			{"count": 0,"word": "fuck"},
			{"count": 0,"word": "fuckable"},
			{"count": 0,"word": "fucked"},
			{"count": 0,"word": "fucker"},
			{"count": 0,"word": "fuckin"},
			{"count": 0,"word": "fucks"},
			{"count": 0,"word": "fvck"}
		],
		substituteWords: [
			{"substitute": "[love]","word": "fuck"},
			{"substitute": "[loveable]","word": "fuckable"},
			{"substitute": "[loved]","word": "fucked"},
			{"substitute": "[lover]","word": "fucker"},
			{"substitute": "[lovin]","word": "fuckin"},
			{"substitute": "[loves]","word": "fucks"},
			{"substitute": "[lve]","word": "fvck"}
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