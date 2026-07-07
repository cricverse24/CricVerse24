async function showScore() {
  try {
    const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=31090fe2-48a3-4286-b565-aa560a422e64&offset=0");

    const result = await response.json();

    if (result.data && result.data.length > 0) {
      let text = "";

      result.data.slice(0, 5).forEach(match => {
        text += `${match.name}\n`;
        text += `${match.status}\n\n`;
      });

      alert(text);
    } else {
      alert("No live matches found.");
    }
  } catch (error) {
    alert("Error loading live scores.");
  }
}