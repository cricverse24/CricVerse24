const apiKey = "YAHAN_APNI_API_KEY_PASTE_KARO";

async function loadMatches() {
  const container = document.getElementById("liveMatches");

  if (!container) return;

  container.innerHTML = "<p>Loading live matches...</p>";

  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const result = await response.json();

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