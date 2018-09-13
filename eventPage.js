chrome.runtime.onInstalled.addListener(function() {
	var defaultSettings = {
		censorCharacter: "****",
		filterMethod: "1",
		filterToggle: true,
		matchMethod: "0",
		password: "null", 
		warningDomains: [
			"www.facebook.com",
			"www.twitter.com",
			"www.pornhub.com",
			"www.9gag.com",
			"www.tumblr.com"
		]
	}
    chrome.storage.sync.set(defaultSettings, function() {
      	console.log("Extension successfully installed");
    });
  });