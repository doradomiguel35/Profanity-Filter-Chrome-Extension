console.log("UnseeIt V1.0 Ready");
var filterMethod = 1; 
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
var word = defaultWords[0];

function filterWords(){
	for (var k = 0; k < defaultWords.length; k++) {
		var words = defaultWords[k];
		for (var i = 0; i < innerBody.length; i++) {
		  var element = innerBody[i];
			for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				if (node.nodeType === 3) {
					var text = node.nodeValue;
					var wordRegex = new RegExp("\\b"+defaultWords[k]+"\\b","gi");
					switch(filterMethod){		
						case 0://Censor
							replaceWords(text,element,wordRegex,"****",node);
							break;
						case 1://Substitute 
							if(wordRegex.test(text) === true){
								var word = text.replace(wordRegex,defaultWords[k]);
								var res = word.match(wordRegex);
								for(var matchedWord of res){
									if(defaultWords[k] === matchedWord ){
										var textReplace = text.replace(wordRegex, replaceAndSubstitute(matchedWord));
										element.replaceChild(document.createTextNode(textReplace), node);
										profanityCount++
									}
								}
							}	

							
							break;
						case 2://Remove 
							replaceWords(text,element,wordRegex,"",node);
							break;

					}
				}
			}
		}	
	}
}

function replaceWords(text,element,wordRegex,replace,node){
	var replacedText = text.replace(wordRegex, replace);
	element.replaceChild(document.createTextNode(replacedText), node);
}

function replaceAndSubstitute(word){
	var replace = substituteWords[word]["substitute"];
	return replace;
}


filterWords();

console.log("Number of words filtered: "+profanityCount);