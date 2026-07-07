const apiKey = "APNI_API_KEY_YAHAN_LIKHO";

async function loadMatches() {
  const container = document.getElementById("liveMatches");

  try {
    const res = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const result = await res.json();

    if (!result.data || result.data.length === 0) {
      container.innerHTML = "<p>No live matches available.</p>";
      return;
    }

    let html = "";

    result.data.forEach(match => {
      html += `
        <div class="card">
          <h3>${match.name}</h3>
          <p><strong>Status:</strong> ${match.status}</p>
          <p><strong>Venue:</strong> ${match.venue}</p>
          <hr>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (e) {
    container.innerHTML = "<p>Failed to load matches.</p>";
  }
}

loadMatches();