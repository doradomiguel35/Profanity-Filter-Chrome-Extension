var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0,
	"password": "null",
};

var matchMethod = 0;
var profanityCount = 0;
var filterMethod,censorCharacter,filterToggle,matchMethod;
var wordRegex,stringifyObject,retrieveCount,regexpSite,node,wordRegex;
var xpathDocText = '//*[not(self::script or self::style)]/text()[normalize-space(.) != ""]';
var xpathNodeText = './/*[not(self::script or self::style)]/text()[normalize-space(.) != ""]';
var defaultWords = [];
var substituteWords = [];
var websites = [];
var origin_site = document.location.origin;



var innerBody = document.querySelectorAll('*');

console.log("UnseeIt V1.0 Ready");
	
function loadSettings(){
	chrome.storage.sync.get(settings,function(settings){
		chrome.storage.sync.get(['defaultWords'],function(result){
			chrome.storage.sync.get(['substituteWords'],function(sub){
				chrome.storage.sync.get(['websites'],function(site){
					defaultWords = result.defaultWords;
					substituteWords = sub.substituteWords;
					websites = site.websites;
					filterMethod = settings.filterMethod;
					censorCharacter = settings.censorCharacter;
					filterToggle = settings.filterToggle;
					matchMethod = settings.matchMethod;
					profanityCount = 0;
					origin_site = document.location.origin;
					toggleFilter();
				});
			});
		});
	});
}

function mutationObserver(){
	var observerConfig = {
    childList: true,
    subtree: true
  };

  // When DOM is modified, remove profanity from inserted node
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      checkNodeForProfanity(mutation);
    });
  });


  // Remove profanity from new objects
  observer.observe(document, observerConfig);
}

function checkNodeForProfanity(mutation) {
  mutation.addedNodes.forEach(function(node) {
    // console.log(isForbiddenNode(node));
    if (!isForbiddenNode(node)) {
      filterWords(xpathNodeText, node);
    }

  });
}

function isForbiddenNode(node) {
  return node.isContentEditable || // DraftJS and many others
  (node.parentNode && node.parentNode.isContentEditable) || // Special case for Gmail
  (node.tagName && (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
                    node.tagName.toLowerCase() == "input" ||
                    node.tagName.toLowerCase() == "script" ||
                    node.tagName.toLowerCase() == "style")
  );
}

function filterWords(xpathExpression, node){
	node = (typeof node !== 'undefined') ?  node : document;
  var evalResult = document.evaluate(
    xpathExpression,
    node,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (var i = 0; i < evalResult.snapshotLength; i++) {
    var textNode = evalResult.snapshotItem(i);
    textNode.data = replaceText(textNode.data);
  }

  

}

function checkWebsite(){
	stringifyObject = JSON.stringify(websites);
	regexpSite = new RegExp(origin_site);

	for(var i = 0;i < websites.length; i++){
		regexpSite = new RegExp(origin_site);

		//Check if site is existing 
		if(origin_site === websites[i].site){
			stringifyObject = JSON.stringify(websites);
			var replaceObject = stringifyObject.replace(websites[i].count,function(){
					retrieveCount = parseInt(websites[i].count);
					retrieveCount+=profanityCount;
					return retrieveCount.toString();
			});
			websites = JSON.parse(replaceObject);
			chrome.storage.sync.set({websites},function(){
				websites.push(JSON.parse(replaceObject));
			});
		}
	}

	//Check if site is non-existing
	if(regexpSite.test(JSON.stringify(websites))!= true){
			addWebStatistics(origin_site,profanityCount);
	}
}

function replaceText(text){
	switch(filterMethod){
		case "0"://Censor Method
			for(var i = 0; i < defaultWords.length; i++){
				// console.log(text+"==="+result.defaultWords[i].word);
				var wordRegex = globalMatchMethods(matchMethod,defaultWords[i].word);
				if(wordRegex.test(text) === true){
					text = text.replace(wordRegex, censorCharacter);
					profanityCount++;
					let temp = defaultWords.find(e => e.word === defaultWords[i].word);
					temp.count+=1;
					chrome.storage.sync.set({defaultWords},function(){});
				}
			}
			
			break;
		case "1": //Substitute Method
			for(var i = 0; i < substituteWords.length; i++){
				var wordRegex = globalMatchMethods(matchMethod,substituteWords[i].word);
				if(wordRegex.test(text) === true){
					text = text.replace(wordRegex, substituteWords[i].substitute);
					profanityCount++;
					let temp = defaultWords.find(e => e.word === substituteWords[i].word);
					console.log(temp+=1);
					chrome.storage.sync.set({defaultWords},function(){});
				}
			}
			
			break;
		case "2": //Remove Method
			for(var i = 0; i < defaultWords.length; i++){
				var wordRegex = globalMatchMethods(matchMethod,defaultWords[i].word);
				if(wordRegex.test(text) === true){
					text = text.replace(wordRegex, "");
					profanityCount++;
					let temp = defaultWords.find(e => e.word === defaultWords[i].word);
					temp.count+=1;
					chrome.storage.sync.set({defaultWords},function(){});
				}
			}
			chrome.storage.sync.set({defaultWords},function(){});
			break;
	}
	
	return text;
}

function addWebStatistics(site, profanityCount){
	var websites = [];
	chrome.storage.sync.get(['websites'],function(result){
		//Pushes entire object array to a new variable array
		for(var i = 0 ; i < result.websites.length ; i++){
				websites.push(result.websites[i]);
		}
		websites.push({"site":site, "count":profanityCount.toString()}); // Push new object to array
		chrome.storage.sync.set({websites},function(){  
			websites.push({"site":site, "count":profanityCount.toString()});
		});
	});
}

function checkWarningDomain(){
	var origin_site = document.location.origin;
	chrome.storage.sync.get(['warningDomains'],function(result){
		for(var i = 0; i < result.warningDomains.length; i++){
			if(origin_site === result.warningDomains[i]){ // Check if site is a Warning domain
				alert("Warning: This website contains a lot of profanity");
			}
		}
	});
}

function globalMatchMethods(matchMethod,defaultWords){
	var wordRegexMethod;
	switch(matchMethod){
		case "0"://Match Word
			wordRegexMethod = new RegExp("\\b"+defaultWords+"\\b",'gi');
			break;
		case "1"://Per Word
			wordRegexMethod = new RegExp('(' + defaultWords + ')','gi');
			break;
	}
	return wordRegexMethod;
}

function switchFilterMethods(filterMethod,text,element,wordRegex,node,word,defaultWords){
	switch(filterMethod){		
		case "0"://Censor
			censorWord(text,element,wordRegex,node,word,defaultWords);
			break;
		case "2"://Remove 
			removeWord(text,element,wordRegex,node,word,defaultWords);
			break;
	}
}

function toggleFilter(){
	if(filterToggle === true){
		filterWords(xpathDocText);
		checkWebsite();
		checkWarningDomain();
		mutationObserver();
	}
}

loadSettings();
