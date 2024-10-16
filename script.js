// Function to generate all possible combinations of spin words
function generateSpinTax(sentence) {
  // Find all spin words in the sentence
  const spinWords = sentence.match(/\{([^}]+)\}/g);

  if (!spinWords) return [sentence]; // Return original if no spin words

  // Generate all combinations recursively
  function combineSentence(currentSentence, index) {
    if (index >= spinWords.length) return [currentSentence];

    const spinWord = spinWords[index];
    const options = spinWord.replace(/{|}/g, "").split("|");

    const results = [];
    options.forEach((option) => {
      const newSentence = currentSentence.replace(spinWord, option);
      results.push(...combineSentence(newSentence, index + 1));
    });

    return results;
  }

  return combineSentence(sentence, 0);
}

// Add an event listener to the generate button
document.getElementById("generate-button").addEventListener("click", () => {
  const inputSentence = document.getElementById("input-sentence").value;
  const generatedSentences = generateSpinTax(inputSentence);

  // Display the generated sentences
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  generatedSentences.forEach((sentence) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = sentence;
    outputDiv.appendChild(paragraph);
  });
});
