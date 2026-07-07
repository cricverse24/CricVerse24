
const apiKey = "31090fe2-48a3-4286-b565-aa560a422e64";

async function loadMatches() {
  const container = document.getElementById("liveMatches");

  if (!container) return;

  container.innerHTML = "<p>Loading live matches...</p>";

  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const result = await response.json();
container.innerHTML = "<pre>" + JSON.stringify(result, null, 2) + "</pre>";
return;
    if (!result.data || result.data.length === 0) {
      container.innerHTML = "<p>No live matches available.</p>";
      return;
    }

    let html = "";

    result.data.slice(0, 10).forEach(match => {
      html += `
        <div class="card">
          <h3>${match.name || "Match"}</h3>
          <p><strong>Status:</strong> ${match.status || "N/A"}</p>
          <p><strong>Venue:</strong> ${match.venue || "Unknown"}</p>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Failed to load matches.</p>";
  }
}

loadMatches();
async function loadUpcomingMatches() {
  const container = document.getElementById("upcomingMatches");

  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/matches?apikey=${apiKey}&offset=0`
    );

    const result = await response.json();
console.log(result);
    if (!result.data || result.data.length === 0) {
      container.innerHTML = "<p>No upcoming matches.</p>";
      return;
    }

    let html = "";

    result.data.slice(0, 10).forEach(match => {
      html += `
        <div class="card">
          <h3>${match.name}</h3>
          <p><strong>Date:</strong> ${match.date}</p>
          <p><strong>Venue:</strong> ${match.venue}</p>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = "<p>Failed to load upcoming matches.</p>";
  }
}

loadUpcomingMatches();