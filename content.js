console.log("UnseeIt V1.0 Ready");

var defaultWords = ['ass','asses','asshole','assshit','ass-hat',
					'assbag','assbite','asscock','assfuck','asshead',
					'asslick','asslicker','assmonkey','assmunch','asssucker',
<<<<<<< HEAD
					'bastard','bitch','blowjob','bampot','bitchass',
					'bitchy','bullshit',
=======
					'bastard','blowjob','bampot','bitchass','bitchy','bullshit',
>>>>>>> 9d2dc1a42d3ee83b3ebec78b199a39a443ccc447
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
<<<<<<< HEAD
					'fagfucker','fuck','fvck','fuckass','fuckbag',
					'fuckboy','fuckgirl','fuckbrain','fuckbutter','fucked',
					'fucker','fuckersucker','fuckface','fuckhole','fuckin',
					'fucking','fucknut','fucknutt','fucks','fuckstick',
					'fucktard','fuckup','fuckwad','fuckwit','fuckwitt',
					'gayfuck','gayfuckist','goddamnit',
					'jackass','jagoff','jerkass',
					'lameass',
					'motherfucka','motherfucker',];
=======
					'fagfucker','fuck','fvck','fuckass',
					'bastard','bitch','blowjob',
					'cunt','creampie','cum',
					'damn','dick','douchebag','deepthroat',
					'fuck','fvck',
					'handjob',
					'motherfucker',
					'orgy',
					'piss','pissed','pissing',
					'shit',
					'whore'];
>>>>>>> 9d2dc1a42d3ee83b3ebec78b199a39a443ccc447

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;
var wordSplit = [];
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
					var wordRegex = new RegExp("\\b"+defaultWords[k]+"\\b" ,"gi");
					
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
