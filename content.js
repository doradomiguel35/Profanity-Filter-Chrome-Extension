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
	"dickjuice","dickmilk","dicksucker","dickwad","dickweasel",
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
	'fuck':'[love]','fucks':'[loves]','fucker':'[lover]',
	'fuckable':'[loveable]','fucked':'[loved]','fuckin':'[lovin]',
	'fvck':'[lve]','fck':'[lve]'

};

var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0
};

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var filterMethod,censorCharacter,filterToggle,matchMethod,site;
var matchMethod = 0;
var wordRegex;
var stringifyObject;
var retrieveCount;
var regexpSite;

console.log("UnseeIt V1.0 Ready");
// var word = defaultWords[0];
// console.log(replaceAndSubstitute(word));

function loadSettings(){
	var websites= [];
	chrome.storage.sync.get(settings,function(settings){
		filterMethod = settings.filterMethod;
		censorCharacter = settings.censorCharacter;
		filterToggle = settings.filterToggle;
		matchMethod = settings.matchMethod;
		var origin_site = document.location.origin;

		console.log("Filter Method:"+filterMethod+",\n"+"Censor Character:"+censorCharacter+",\n"+"Filter Toggle:"+filterToggle+",\n"+"Match Method: "+matchMethod);
		toggleFilter();
		console.log("Number of words filtered: "+profanityCount);
		chrome.storage.sync.get(['websites'],function(result){
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
					console.log(websites);
					chrome.storage.sync.set({websites},function(){
						console.log("Key Overwritten");

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
	for (var k = 0; k < defaultWords.length; k++) {
		var words = defaultWords[k];
		for (var i = 0; i < innerBody.length; i++) {
		  var element = innerBody[i];
			for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				if (node.nodeType === 3) {
					var text = node.nodeValue;
					var wordRegexMethod = globalMatchMethods(matchMethod,defaultWords[k]);
					//Censor/Remove methods
					if(filterMethod != "1"){ 
						switchFilterMethods(filterMethod,text,element,wordRegexMethod,node,profanityCount,defaultWords[k]);
					}

					else{
						//Substitute method
						substituteWord(text,element,wordRegexMethod,node,defaultWords[k]);
					}
				} 
			}
		}	
	}
}

function addWebStatistics(site, profanityCount){
	var websites = [];
	chrome.storage.sync.get(['websites'],function(result){
		for(var i = 0 ; i < result.websites.length ; i++){
				websites.push(result.websites[i]);
		}
		websites.push({"site":site, "count":profanityCount.toString()});
		console.log(JSON.stringify(websites));
		chrome.storage.sync.set({websites},function(){
			websites.push({"site":site, "count":profanityCount.toString()});
			console.log("Keys set");
		});
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

function switchFilterMethods(filterMethod,text,element,wordRegex,node,defaultWords){
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
	if(wordRegex.test(text) === true){
		var substitutedWord = substituteWords[defaultWords];
		replaceWords(text,element,wordRegex,substitutedWord,node);
	}
}

//Censor Method
function censorWord(text,element,wordRegex,node) {
	if(wordRegex.test(text) === true){
		var character;
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
		replaceWords(text,element,wordRegex,"",node);
	}
}

function replaceWords(text,element,wordRegex,replace,node){
	var replacedText = text.replace(wordRegex, replace);
	element.replaceChild(document.createTextNode(replacedText), node);
	profanityCount++;
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

loadSettings();

