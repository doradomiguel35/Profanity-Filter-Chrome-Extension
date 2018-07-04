console.log("UnseeIt V1.0 Ready");

var defaultWords = ['ass','asses','asshole','assshit','ass-hat',
					'assbag','assbite','asscock','assfuck','asshead',
					'asslick','asslicker','assmonkey','assmunch','asssucker',
<<<<<<< HEAD
					'bastard','bitch','blowjob','bampot','bitchass',
					'bitchy','bullshit',
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
=======
					'bastard','bitch','blowjob',
					'cunt','creampie','cum',
					'damn','dick','douchebag','deepthroat',
					'fuck','fvck',
>>>>>>> 028b43b2f04ab00dec7cd538c2e50b75107f9731
					'handjob',
					'motherfucker',
					'orgy',
					'piss','pissed','pissing',
					'slut','shit','son of a bitch',
					'tits',
					'whore'];

var innerBody = document.getElementsByTagName("*");
var profanityCount = 0;

var word = defaultWords[0];


for (var k = 0; k < defaultWords.length; k++) {
	var words = defaultWords[k];
	for (var i = 0; i < innerBody.length; i++) {
		var element = innerBody[i];
		
		for (var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];
				
			if (node.nodeType === 3) {
				var text = node.nodeValue;
				// console.log(text.search(defaultWords[k]))
				// if(defaultWords[k] === text.search(defaultWords[k])){
				var replacedText = text.toLowerCase().replace(defaultWords[k], '****');
				// if (replacedText != text) {

				element.replaceChild(document.createTextNode(replacedText), node);
				profanityCount++;
			// }
				
			
			}
		}
	}	
}
console.log(profanityCount);
