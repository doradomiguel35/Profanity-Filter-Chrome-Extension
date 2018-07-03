console.log("UnseeIt V1.0 Ready");

var defaultWords = ['ass','asses','asshole',
					'bastard','bitch','blowjob',
					'cunt','clitoris','creampie','cum',
					'damn','dick','douche','douchebag','deepthroat',
					'fuck','fvck',
					'handjob',
					'motherfucker',
					'orgy',
					'piss','pissed',
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
					// console.log(node.nodeValue);
					var lowerCasetxt = text.toLowerCase();
					var replacedText = lowerCasetxt.replace(defaultWords[k], '****');
					
					// console.log(replacedText);
					if (replacedText != text) {
						element.replaceChild(document.createTextNode(replacedText), node);
						profanityCount++;
					}
					
				}
			
		}
	}
	console.log(replacedText.toString());
}
console.log(profanityCount);
