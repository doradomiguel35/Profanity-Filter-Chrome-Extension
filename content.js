console.log("UnseeIt V1.0 Ready");

var defaultWords = ['ass','asses','asshole','assshit','ass-hat',
					'assbag','assbite','asscock','assfuck','asshead',
					'asslick','asslicker','assmonkey','assmunch','asssucker',
					'bastard','bitch','blowjob','bampot','bitchass','bitchy','bullshit',
					'cunt','clitoris','creampie','cum','clitface',
					'clusterfuck','cockass','cockbite','cockburger','cockface',
					'cockhead','cockmonkey','cocknose','cocknugget','cockshit',
					'cockwaffle','cumbubble','cumslut','cumtart','cuntass',
					'cumdumpster','cuntface','cuntrag','cuntslut',
					'damn','douche','douchebag','deepthroat','dick',
					'dickbag','dickface','dickfuck','dickfucker','dickhead',
					'dickjuice','dickmilk','dicksucker','dickwad','dickweasel',
					'dickweed','dickwod','dipshit','doochbag','douchefag',
					'dumass','dumb ass','dumbass','dumbfuck','dumbshit','dumshit',
					'fagfucker','fuck','fvck','fuckass',
					'bastard','bitch','blowjob',
					'cunt','creampie','cum',
					'damn','dick','douchebag','deepthroat',
					'fuck','fvck',
					'handjob',
					'motherfucker',
					'orgy',
					'piss','pissed','pissing',
					'slut','shit',
					'tits',
					'whore'];

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var wordSplit = [];
var word = defaultWords[0];

function filteredWords(){
	for (var k = 0; k < defaultWords.length; k++) {
		var words = defaultWords[k];
		for (var i = 0; i < innerBody.length; i++) {
			var element = innerBody[i];
			
			for (var j = 0; j < element.childNodes.length; j++) {
				var node = element.childNodes[j];
				
				if (node.nodeType === 3) {
					var text = node.nodeValue;
					var wordRegex = new RegExp("\\b"+defaultWords[k]+"\\b" || "\\b\\s"+defaultWords[k]+"\\b\\s","i");
					
					if(wordRegex.test(text) === true){
						var replacedText = text.replace(wordRegex, '****');
						element.replaceChild(document.createTextNode(replacedText), node);
						profanityCount++;
					}
				}
				
				
			}
		}	
	}
}

filteredWords();
console.log("Number of words filtered: "+profanityCount);
