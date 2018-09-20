var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0,
	"password": "null",
};

var innerBody = document.querySelectorAll('body *')
var filterMethod,censorCharacter,filterToggle,matchMethod,site;
var matchMethod = 0;
var wordRegex;
var stringifyObject;
var retrieveCount;
var regexpSite;
var profanityCount = 0;
var words = [];


console.log("UnseeIt V1.0 Ready");

function loadSettings(){
	chrome.storage.sync.get(settings,function(settings){
		filterMethod = settings.filterMethod;
		censorCharacter = settings.censorCharacter;
		filterToggle = settings.filterToggle;
		matchMethod = settings.matchMethod;
		toggleFilter();
	});
}

function filterWords(){
	var origin_site = document.location.origin;
	var websites;
	chrome.storage.sync.get(['defaultWords'],function(result){
		chrome.storage.sync.get(['substituteWords'],function(sub){
			for (var k = 0; k < result.defaultWords.length; k++) {
				var words = result.defaultWords[k].word;
				for (var i = 0; i < innerBody.length; i++) {
				  var element = innerBody[i];
					for (var j = 0; j < element.childNodes.length; j++) {
						var node = element.childNodes[j];
						var text = node.nodeValue;
						var defaultWords = result.defaultWords;
						var wordRegexMethod = globalMatchMethods(matchMethod,result.defaultWords[k].word);
						//Censor/Remove methods
						if(filterMethod != "1"){ 
							switchFilterMethods(filterMethod,text,element,wordRegexMethod,node,result.defaultWords[k].word,defaultWords);
						}

						else{
							//Substitute method
							if(wordRegexMethod.test(text) === true){
								for(var i = 0; i < sub.substituteWords.length; i++){
									var objectWord = sub.substituteWords[i].word;
									var substitutedWord = sub.substituteWords[i].substitute;
									if(objectWord === result.defaultWords[k].word){
										replaceWords(text, element, wordRegexMethod,substitutedWord,node,result.defaultWords[k].word,defaultWords);
									}
								}
							}
						}
						
					}
				}	
			}

			chrome.storage.sync.get(['websites'],function(result){
				console.log("Number of words filtered: "+profanityCount);
				stringifyObject = JSON.stringify(result.websites);
				regexpSite = new RegExp(origin_site);

				for(var i = 0;i < result.websites.length; i++){
					site = result.websites[i].site;
					regexpSite = new RegExp(origin_site);

					//Check if site is existing 
					if(origin_site === site){
						stringifyObject = JSON.stringify(result.websites);
						var replaceObject = stringifyObject.replace(result.websites[i].count,function(){
								retrieveCount = parseInt(result.websites[i].count);
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
			});
		});
	});
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

//Censor Method
function censorWord(text,element,wordRegex,node,word,defaultWords){
	if(wordRegex.test(text) === true){
		switch(censorCharacter){
			case "****":
				replaceWords(text,element,wordRegex,"****",node,word,defaultWords);
				break;
			case "&&&&":
				replaceWords(text,element,wordRegex,"&&&&",node,word,defaultWords);
				break;
			case "$$$$":
				replaceWords(text,element,wordRegex,"$$$$$$$$",node,word,defaultWords);
				break;
			case "####":
				replaceWords(text,element,wordRegex,"####",node,word,defaultWords);
				break;
			case "@@@@":
				replaceWords(text,element,wordRegex,"@@@@",node,word,defaultWords);
				break;
			case "^^^^":
				replaceWords(text,element,wordRegex,"^^^^",node,word,defaultWords);
				break;
			case "----":
				replaceWords(text,element,wordRegex,"----",node,word,defaultWords);
				break;
			case "____":
				replaceWords(text,element,wordRegex,"____",node,word,defaultWords);
				break;
			case "mixed":
				replaceWords(text,element,wordRegex,"*&$#",node,word,defaultWords);
				break;
		}
	}

}

//Remove Method
function removeWord(text,element,wordRegex,node,word,defaultWords){
	if(wordRegex.test(text) === true){
		profanityCount++;
		replaceWords(text,element,wordRegex,"",node,word,defaultWords);
	}
}

function replaceWords(text,element,wordRegex,replace,node,word,defaultWords){
	profanityCount++;
	var wordCount;
	var replacedText = text.replace(wordRegex, replace);
	element.replaceChild(document.createTextNode(replacedText), node);
	
	let temp = defaultWords.find(e => e.word === word);
	temp.count+=1;
	
	chrome.storage.sync.set({defaultWords},function(){
		console.log(defaultWords);
	});

	
}

function assignKey(obj, key) {
  typeof obj[key] === 'undefined' ? obj[key] = 1 : obj[key]++;
}

function findIndex(array, attr, value){
	for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i; 
        }
    }
    return -1;
}

function replaceAndSubstitute(word){
	var replace = substituteWords[word];
	console.log(replace);
	return replace;
}

function toggleFilter(){
	if(filterToggle === true){
		filterWords();
	}
}

checkWarningDomain();
loadSettings();