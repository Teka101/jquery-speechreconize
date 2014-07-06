(function($)
{
	$.fn.SpeechReconize = function(SENTENCES, WORDS, sentence)
		{
			return analyzeSentence(SENTENCES, WORDS, sentence);
		}

		function analyzeSentence(SENTENCES, WORDS, sentence)
		{
			var words = sentence.toLowerCase().replace("'", ' ').split(' ');
			var s;

			s = wordsRecognizing(WORDS, words).join(' ');
			for (var key in SENTENCES)
			{
				var sentence = SENTENCES[key];
				var m = s.match(sentence.text);

				if (m != null && m.length >= 1)
				{
					sentence.action(m);
					return s;
				}
			}
		}

		function wordsRecognizing(WORDS, words)
		{
			var results = [];

			for (var key in words)
			{
				var wType = wordRecognizing(WORDS, words[key]);

				if (wType != null)
					results.push(wType);
			}
			return results;
		}

		function wordRecognizing(WORDS, word)
		{
			for (var type in WORDS)
			{
				var	wordsValues = WORDS[type];

				if ($.isArray(wordsValues))
				{
					if ($.inArray(word, wordsValues) != -1)
						return type;
				}
				else
				{
					for (var value in wordsValues)
						if ($.inArray(word, wordsValues[value]) != -1)
							return value;
				}
			}
			return null;
		}
}(jQuery));
