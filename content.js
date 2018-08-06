var defaultWords = [
	"asses","asshole","assshit","ass-hat",,"asssucker",
	"assbag","assbite","asscock","assfuck","asshead",
	"asslick","asslicker","assmonkey","assmunch","ass",
	"bastard","blowjob","bampot","bitchass","bitchy",
	"bullshit","bitch",
	"cunt","creampie","cum","clitface",
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
	// "asses":{"substitute":["[butts]"]},"asshole":{"substitute":["[butthole]"]},
	// "assshit":{"substitute":["[buttard]"]},"ass-hat":{"substitute":["[butt-hat]"]},
	// "asssucker":{"substitute":["[buttsipper]"]},"assbag":{"substitute":["[buttbag]"]},
	// "assbite":{"substitute":["[buttbite]"]},"asscock":{"substitute":["[buttcrook]"]},
	// "assfuck":{"substitute":["[buttmate]"]},"asshead":{"substitute":["[butthead]"]},
	// "asslick":{"substitute":["[buttlick]"]},"asslicker":{"substitute":["[buttlicker]"]},
	// "assmonkey":{"substitute":["[buttmonkey]"]},"assmunch":{"substitute":["[butmunch]"]},
	// "ass":{"substitute":["[butt]"]},
	// "bastard":{"substitute":["[no father]"]}
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
	'asses':'[butts]','asshole':'[butthole]',
	'assshit':'[buttard]','ass-hat':'[butt-hat]',
	'asssucker':'[buttsipper]','assbag':'[buttbag]',
	'assbite':'[buttbite]','asscock':'[buttcrook]',
	'assfuck':'[buttmate]','asshead':'[butthead]',
	'asslick':'[buttlick]','asslicker':'[buttlicker]',
	'assmonkey':'[buttmonkey]','assmunch':'[butmunch]',
	'ass':'[butt]','bastard':'[no father]'
};

var settings = {
	"filterMethod": 1,
	"censorCharacter": "*",
	"filterToggle": true,
	"matchMethod": 0
};

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var filterMethod,censorCharacter,filterToggle,matchMethod;
var matchMethod = 0;
var wordRegex;

console.log("UnseeIt V1.0 Ready");
// var word = defaultWords[0];
// console.log(replaceAndSubstitute(word));

function loadSettings(){
	chrome.storage.sync.get(settings,function(settings){
		filterMethod = settings.filterMethod;
		censorCharacter = settings.censorCharacter;
		filterToggle = settings.filterToggle;
		matchMethod = settings.matchMethod;
		console.log("Filter Method:"+filterMethod+",\n"+"Censor Character:"+censorCharacter+",\n"+"Filter Toggle:"+filterToggle+",\n"+"Match Method"+matchMethod);
		toggleFilter();
	});
	
	// console.log()
	// chrome.storage.sync.get("censorCharacter",function(settings){
	// 	censorCharacter = settings.censorCharacter;
	// 	console.log(censorCharacter);
	// });
	
}

function filterWords(){
	console.log("function executed");
	for (var k = 0; k < defaultWords.length; k++) {
		// console.log("interated");
		var words = defaultWords[k];
		for (var i = 0; i < innerBody.length; i++) {
		  var element = innerBody[i];
			for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				if (node.nodeType === 3) {
					var text = node.nodeValue;
					var wordRegexMethod = globalMatchMethods(matchMethod,defaultWords[k]);
					switchFilterMethods(filterMethod,text,element,wordRegexMethod,node,profanityCount,defaultWords[k]);
					
				} 
			}
		}	
	}
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
		case "1"://Substitute 
			// console.log(defaultWords);
			substituteWord(text,element,wordRegex,node,defaultWords);
			break;
		case "2"://Remove 
			removeWord(text,element,wordRegex,node);
			break;
	}
}

//Substitute Method
function substituteWord(text,element,wordRegex,node,defaultWords){
	// if(wordRegex.test(text) === true){
	// 	var replaceWord = text.replace(wordRegex,defaultWords);
	// 	var res = replaceWord.match(wordRegex);
	// 	console.log(res);
	// 	for(var matchedWord of res){
	// 		if(defaultWords === matchedWord ){
	// 			var textReplace = text.replace(wordRegex, replaceAndSubstitute(matchedWord));
	// 			element.replaceChild(document.createTextNode(textReplace), node);
	// 			profanityCount++;
	// 		}
	// 	}
	// }	

	if(wordRegex.test(text) === true){
		var substitutedWord = replaceAndSubstitute(defaultWords);
		console.log(defaultWords);
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
	return replace;
}

function toggleFilter(){
	// chrome.storage.sync.get(['filterToggle'], function (result){
	// 	var toggle = result.filterToggle;
	// 	console.log(toggle);
		console.log(filterToggle);

		if(filterToggle === true){
			filterWords();
		}
	// });
}

loadSettings();
// toggleFilter();
console.log("Number of words filtered: "+profanityCount);