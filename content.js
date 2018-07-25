console.log("UnseeIt V1.0 Ready");

var defaultWords = [
	"asses","asshole","assshit","ass-hat",,"asssucker",
	"assbag","assbite","asscock","assfuck","asshead",
	"asslick","asslicker","assmonkey","assmunch","ass",
	"bastard","blowjob","bampot","bitchass","bitchy",
	"bullshit","bitch",
	"cunt","clitoris","creampie","cum","clitface",
	"clusterfuck","cockass","cockbite","cockburger","cockface",
	"cockhead","cockmonkey","cocknose","cocknugget","cockshit",
	"cockwaffle","cumbubble","cumslut","cumtart","cuntass",
	"cumdumpster","cuntface","cuntrag","cuntslut","cock",
	"damn","douche","douchebag","deepthroat",
	"dickbag","dickface","dickfuck","dickfucker","dickhead",
	"dickjuice","dickmilk","dicksucker","dickwad","dickweasel",
	"dickweed","dickwod","dipshit","doochbag","douchefag",
	"dumass","dumb ass","dumbass","dumbfuck","dumbshit","dumshit","dick",
	"fagfucker","fvck","fucker","fuckers","fucks","fucken","fucking","fuckass","fuck",
	"handjob","holyshit",
	"motherfucker",
	"orgy",
	"piss","pissed","pissing",
	"shite","shit", 		
	"whore"
];

var substituteWords = {
	"asses":{"substitute":"[butts]"},"asshole":{"substitute":"[butthole]"},
	"assshit":{"substitute":"[buttard]"},"ass-hat":{"substitute":"[butt-hat]"},
	"asssucker":{"substitute":"[buttsipper]"},"assbag":{"substitute":"[buttbag]"},
	"assbite":{"substitute":"[buttbite]"},"asscock":{"substitute":"[buttcrook]"},
	"assfuck":{"substitute":"[buttmate]"},"asshead":{"substitute":"[butthead]"},
	"asslick":{"substitute":"[buttlick]"},"asslicker":{"substitute":"[buttlicker]"},
	"assmonkey":{"substitute":"[buttmonkey]"},"assmunch":{"substitute":"[butmunch]"},
	"ass":{"substitute":"[butt]"},"bastard":{"substitute":"[no father]"}
	// "blowjob":{[""]},"bampot":{[""]},
	// "bitchass":{[""]},"bitchy":{[""]},
	// "bullshit":{[""]},"bitch":{[""]},
	// "cunt":{[""]},
	// "creampie":{[""]},"cum":{[""]},
	// "clitface":{[""]},"clusterfuck":{[""]},
	// "cockass":{[""]},"cockbite":{[""]},
	// "cockburger":{[""]},"cockface":{[""]},
	// "cockhead":{[""]},"cockmonkey":{[""]},
	// "cocknose":{[""]},"cocknugget":{[""]},
	// "cockshit":{[""]},"cockwaffle":{[""]},
	// "cumbubble":{[""]},"cumslut":{[""]},
	// "cumtart":{[""]},"cuntass":{[""]},
	// "cumdumpster":{[""]},"cuntface":{[""]},
	// "cuntrag":{[""]},"cuntslut":{[""]},
	// "cock":{[""]},"damn":{[""]},
	// "douche":{[""]},"douchebag":{[""]},
	// "deepthroat":{[""]},"dickbag":{[""]},
	// "dickface":{[""]},"dickfuck":{[""]},
	// "dickfucker":{[""]},"dickhead":{[""]},
	// "dickjuice":{[""]},"dickmilk":{[""]},
	// "dicksucker":{[""]},"dickwad":{[""]},
	// "dickweasel":{[""]},"dickweed":{[""]},
	// "dickwod":{[""]},"dipshit":{[""]},
	// "doochbag":{[""]},"douchefag":{[""]},
	// "dumass":{[""]},"dumb ass":{[""]},
	// "dumbass":{[""]},"dumbfuck":{[""]},
	// "dumbshit":{[""]},"dumshit":{[""]},
	// "dick":{[""]},"fagfucker":{[""]},
	// "fvck":{[""]},"fucker":{[""]},
	// "fuckers":{[""]},"fucks":{[""]},
	// "fucken":{[""]},"fucking":{[""]},
	// "fuckass":{[""]},"fuck":{[""]},
	// "handjob":{[""]},
	// "holyshit":{[""]},
	// "motherfucker":{[""]},
	// "orgy":{[""]},
	// "piss":{[""]},"pissed":{[""]},
	// "pissing":{[""]},
	// "shite":{[""]},"shit":{[""]}, 		
	// "whore":{[""]}
};

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var filterMethod = 0; 
var matchMethod = 1;
var censorCharacter = "****";
var wordRegex;

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
					switchFilterMethods(filterMethod,text,element,wordRegexMethod,censorCharacter,node,profanityCount,defaultWords);
					
				}
			}
		}	
	}
}

function globalMatchMethods(matchMethod,defaultWords){
	var wordRegexMethod;
	switch(matchMethod){
		case 0://Match Word
			wordRegexMethod = new RegExp("\\b"+defaultWords+"\\b",'gi');
			break;
		case 1://Per Word
			// wordRegexMethod = new RegExp('(' + defaultWords + ')' + escapeRegExp(defaultWords.slice(1)),'gi'); 
			wordRegexMethod = new RegExp('(' + defaultWords + ')','gi');
			break;
	}
	return wordRegexMethod;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function switchFilterMethods(filterMethod,text,element,wordRegex,censorCharacter,node,defaultWords){
	switch(filterMethod){		
		case 0://Censor
			censorWord(text,element,wordRegex,censorCharacter,node);
			break;
		case 1://Substitute 
			substituteWord(text,element,wordRegex,node,defaultWords);
			break;
		case 2://Remove 
			removeWord(text,element,wordRegex,node);
			break;
	}
}

function substituteWord(text, element, wordRegex, node, defaultWords){
	if(wordRegex.test(text) === true){
		var word = text.replace(wordRegex,defaultWords);
		var res = word.match(wordRegex);
		for(var matchedWord of res){
			if(defaultWords === matchedWord ){
				var textReplace = text.replace(wordRegex, replaceAndSubstitute(matchedWord));
				element.replaceChild(document.createTextNode(textReplace), node);
				profanityCount++;
			}
		}
	}	
}

function censorWord(text,element,wordRegex,character,node) {
	if(wordRegex.test(text) === true){
		var replacedWord = replaceWords(text,element,wordRegex,character,node);
		profanityCount++;
	}
}

function removeWord(text,element,wordRegex,node){
	if(wordRegex.test(text) === true){
		var replaceWord = replaceWords(text,element,wordRegex,"",node);
		profanityCount++;
	}
}

function replaceWords(text,element,wordRegex,replace,node){
	var replacedText = text.replace(wordRegex, replace);
	element.replaceChild(document.createTextNode(replacedText), node);
}

function replaceAndSubstitute(word){
	var replace = substituteWords[word].substitute;
	return replace;
}

// chrome.runtime.onMessage.addListener(
// 	function (request, sender, sendResponse){
// 		if(request.message === "filter"){
// 			filterWords();
// 		}
// 	});
filterWords();
console.log("Number of words filtered: "+profanityCount);