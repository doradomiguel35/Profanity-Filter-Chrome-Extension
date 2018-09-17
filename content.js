var defaultWords = [
	"asses","asshole","assshit","ass-hat",,"asssucker",
	"assbag","assbite","asscock","assfuck","asshead",
	"asslick","asslicker","assmonkey","assmunch","ass",
	"anal",
	"bastard","blowjob","bampot","bitchass","bitchy",
	"bullshit","bitch",
	"cunt","creampie","cum","clitface",
	"clusterfuck","cockass","cockbite","cockburger","cockface",
	"cockhead","cockmonkey","cocknose","cocknugget","cockshit",
	"cockwaffle","cumbubble","cumslut","cumtart","cuntass",
	"cumdumpster","cuntface","cuntrag","cuntslut","cock",
	"damn","douche","douchebag","deepthroat","dildo","dildos",
	"dickbag","dickface","dickfuck","dickfucker","dickhead",
	"dickjuice","dickmilk","dicksuck er","dickwad","dickweasel",
	"dickweed","dickwod","dipshit","doochbag","douchefag",
	"dumass","dumb ass","dumbass","dumbfuck","dumbshit","dumshit","dick",
	"fagfucker","fvck","fucker","fuckers","fucks","fucken","fucking","fuckass","fucked","fuck","fuckin",
	"fck",
	"handjob","holyshit",
	"motherfucker",
	"orgy",
	"piss","pissed","pissing",
	"shite","shit", 		
	"whore"
];

var substituteWords = {
	'asses':'[butts]','asshole':'[butthole]',		
	'assshit':'[buttard]','ass-hat':'[butt-hat]',
	'asssucker':'[buttsipper]','assbag':'[buttbag]',
	'assbite':'[buttbite]','asscock':'[buttcrook]',
	'assfuck':'[buttmate]','asshead':'[butthead]',
	'asslick':'[buttlick]','asslicker':'[buttlicker]',
	'assmonkey':'[buttmonkey]','assmunch':'[butmunch]',
	'ass':'[butt]','anal':'[butt]','bastard':'[no father]',
	'dildo':'[toy]','dildos':'[toys]',
};

var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0,
	"password": "null",
};

var innerBody = document.getElementsByTagName("*");

var filterMethod,censorCharacter,filterToggle,matchMethod,site;
var matchMethod = 0;
var wordRegex;
var stringifyObject;
var retrieveCount;
var regexpSite;
var profanityCount = 0;

console.log("UnseeIt V1.0 Ready");

function loadSettings(){
	var websites= [];
	chrome.storage.sync.get(settings,function(settings){
		filterMethod = settings.filterMethod;
		censorCharacter = settings.censorCharacter;
		filterToggle = settings.filterToggle;
		matchMethod = settings.matchMethod;
		var origin_site = document.location.origin;
		
		toggleFilter();
		chrome.storage.sync.get(['websites'],function(result){
			console.log("Number of words filtered: "+profanityCount);
			stringifyObject = JSON.stringify(result.websites);
			regexpSite = new RegExp(origin_site);

			for(var i = 0;i < result.websites.length; i++){
				site = result.websites[i].site;
				regexpSite = new RegExp(origin_site);

				//Check if site is existing 
				if(origin_site === site){
					console.log(origin_site);
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
}

function filterWords(){
	chrome.storage.sync.get(['defaultWords'],function(result){
		for (var k = 0; k < result.defaultWords.length; k++) {
			var words = result.defaultWords[k].word;
			for (var i = 0; i < innerBody.length; i++) {
			  var element = innerBody[i];
				for (var j = 0; j < element.childNodes.length; j++) {
					var node = element.childNodes[j];
					if (node.nodeType === 3) {
						var text = node.nodeValue;
						var wordRegexMethod = globalMatchMethods(matchMethod,result.defaultWords[k].word);
						//Censor/Remove methods
						if(filterMethod != "1"){ 
							switchFilterMethods(filterMethod,text,element,wordRegexMethod,node);
						}

						else{
							//Substitute method
							substituteWord(text,element,wordRegexMethod,node,result.defaultWords[k].word);
						}
					} 
				}
			}	
		}
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
		chrome.storage.sync.set({websites},function(){ // 
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

function switchFilterMethods(filterMethod,text,element,wordRegex,node){
	switch(filterMethod){		
		case "0"://Censor
			censorWord(text,element,wordRegex,node);
			break;
		case "2"://Remove 
			removeWord(text,element,wordRegex,node);
			break;
	}
}

//Substitute Method
function substituteWord(text,element,wordRegex,node,defaultWords){
	chrome.storage.sync.get(['substituteWords'],function(result){
		if(wordRegex.test(text) === true){
			for(var i = 0; i < result.substituteWords.length; i++){
				var objectWord = result.substituteWords[i].word;
				var substitutedWord = result.substituteWords[i].substitute;
				if(objectWord === defaultWords){
					replaceWords(text,element,wordRegex,substitutedWord,node);
				}
			}
		}
	});
}

//Censor Method
function censorWord(text,element,wordRegex,node) {
	if(wordRegex.test(text) === true){

		// chrome.storage.sync.get(['defaultWords'],function(result){
			
			
		// 	for(var i = 0; i < result.defaultWords.length; i++){
		// 		if(wordRegex.test(result.defaultWords[i].word)){
		// 			// console.log("Word matched: "+result.defaultWords[i].word);
		// 		    result.defaultWords[i].count+=1;
				    
		// 		}

		// 	}
		// 	console.log(result.defaultWords);
		// });

		switch(censorCharacter){
			case "****":
				replaceWords(text,element,wordRegex,"****",node);
				break;
			case "&&&&":
				replaceWords(text,element,wordRegex,"&&&&",node);
				break;
			case "$$$$":
				replaceWords(text,element,wordRegex,"$$$$$$$$",node);
				break;
			case "####":
				replaceWords(text,element,wordRegex,"####",node);
				break;
			case "@@@@":
				replaceWords(text,element,wordRegex,"@@@@",node);
				break;
			case "^^^^":
				replaceWords(text,element,wordRegex,"^^^^",node);
				break;
			case "----":
				replaceWords(text,element,wordRegex,"----",node);
				break;
			case "____":
				replaceWords(text,element,wordRegex,"____",node);
				break;
			case "mixed":
				replaceWords(text,element,wordRegex,"*&$#",node);
				break;
		}
	}
}

//Remove Method
function removeWord(text,element,wordRegex,node){
	if(wordRegex.test(text) === true){
		profanityCount++;
		replaceWords(text,element,wordRegex,"",node);
	}
}

function replaceWords(text,element,wordRegex,replace,node){
	profanityCount++;
	console.log(profanityCount);
	var replacedText = text.replace(wordRegex, replace);
	element.replaceChild(document.createTextNode(replacedText), node);
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
// chrome.storage.sync.get(['defaultWords'],function(result){
// 	for(var i = 0;i < result.defaultWords.length; i++){
// 		console.log(result.defaultWords[i].word);
// 	}
// });
loadSettings();
