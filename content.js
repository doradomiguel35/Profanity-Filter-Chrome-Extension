console.log("UnseeIt V1.0 Ready");

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

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var wordSplit = [];
var word = defaultWords[0];
var filterMethod = 2; 

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
							if(wordRegex.test(text) === true){
								var replacedText = text.replace(wordRegex, "****");
								element.replaceChild(document.createTextNode(replacedText), node);
								profanityCount++;
							}
							break;
						
						case 1://Substitute
							break;
						
						case 2://Remove 
							if(wordRegex.test(text) === true){
								var replacedText = text.replace(wordRegex, "");
								element.replaceChild(document.createTextNode(replacedText), node);
								profanityCount++;
							}
							break;

					}
				}
				
				
			}
		}	
	}
}

filterWords();
console.log("Number of words filtered: "+profanityCount);
