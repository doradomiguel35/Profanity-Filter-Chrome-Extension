console.log("UnseeIt V1.0 Ready");
var filterMethod = 2; 
var defaultWords = ["asses","asshole","assshit","ass-hat",,"asssucker",
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
					"whore"];

var substituteWords = {
	"asses":"butts","asshole":"butthole",
	"assshit":"buttard","ass-hat":"butt-hat",
	"asssucker":"buttsipper","assbag":"buttbag",
	"assbite":"buttbite","asscock":"buttcrook",
	"assfuck":"buttmate","asshead":"butthead",
	"asslick":"buttlick","asslicker":"buttlicker",
	"assmonkey":"buttmonkey","assmunch":"butmunch",
	"ass":"butt","bastard":"no father",
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
var res = [];

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
							profanityCount++;
							break;
						case 1://Substitute 
							if(wordRegex.test(text) === true){
								var word = text.replace(wordRegex,defaultWords[k]);
								res = text.match(defaultWords[k]);
								// if(defaultWords[k] === res[l]){
								// 	replaceWords(text,element,wordRegex,replaceAndSubstitute(defaultWords[k]),node);
								// 	profanityCount++;
								// }
								// var wordSubstitute = replaceAndSubstitute(word);
								// replaceWords(text,element,wordRegex,wordSubstitute,node);
								console.log(res);
								profanityCount++;
							}
							break;
						case 2://Remove 
							replaceWords(text,element,wordRegex,"",node);
							profanityCount++;
							break;

					}
				}
			}
		}	
	}
}

function replaceWords(text,element,wordRegex,replace,node){
	if(wordRegex.test(text) === true){
		var replacedText = text.replace(wordRegex, replace);
		element.replaceChild(document.createTextNode(replacedText), node);
	}
}

function replaceAndSubstitute(word){
	var replace = substituteWords.word;
	return replace;
}


filterWords();

console.log("Number of words filtered: "+profanityCount);