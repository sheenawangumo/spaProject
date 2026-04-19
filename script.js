const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results");
const savedList = document.getElementById("saved-list");
const clearBtn = document.getElementById("clear-btn");
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let favouriteWords = JSON.parse(localStorage.getItem("favouriteWords")) || [];
let searchHistory = JSON.parse(localStorage.getItem("wordlyHistory")) || [];

renderSavedWords();
renderHistory();

function renderSavedWords() {
    savedList.innerHTML = "";

    if (favouriteWords.length === 0) {
        savedList.innerHTML = "<li class='text-muted'>No saved words.</li>";
        return;
    }

    savedList.innerHTML = favouriteWords.map(word => 
        `<li class="d-flex justify-content-between align-items-center border-bottom py-1">
            <strong>${word}</strong>
            <button class="btn btn-sm btn-link" onclick="reSearch('${word}')">View</button>
        </li>`
    ).join("");
}

function renderHistory() {
    historyList.innerHTML = '';

    if (searchHistory.length === 0) {
        historyList.innerHTML = "<li class='text-muted'>No recent searches.</li>";
        return;
    }

    searchHistory.forEach((word) => {
        const li = document.createElement('li');
        li.className = 'd-flex justify-content-between align-items-center border-bottom py-1';
        li.textContent = word;

        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-sm btn-link';
        viewBtn.textContent = 'View';

        li.appendChild(viewBtn);

        viewBtn.onclick = () => {
            bootstrap.Offcanvas.getInstance(document.getElementById('sidebar')).hide();
            searchInput.value = word;
            performSearch(word);
        };

        historyList.appendChild(li);
    });
}

function addToHistory(word) {
    if (!word) return;

    searchHistory = searchHistory.filter(item => item.toLowerCase() !== word.toLowerCase());
    searchHistory.unshift(word);

    if (searchHistory.length > 5) searchHistory.pop();

    localStorage.setItem('wordlyHistory', JSON.stringify(searchHistory));
    renderHistory();
}

function performSearch(word) {
    resultsContainer.innerHTML = `
        <div class='text-center'>
            <div class='spinner-border text-dark'></div>
            <p class='mt-2'>Searching...</p>
        </div>
    `;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => {
        if (!response.ok) throw new Error("Word not found.");
        return response.json();
      })
      .then(data => {
        const d = data[0];

        const wordName = d.word;
        const definition = d.meanings[0].definitions[0].definition;
        const example = d.meanings[0].definitions[0].example || "No example available.";
        const audioUrl = d.phonetics.find(p => p.audio)?.audio || "";
        const partOfSpeech = d.meanings[0].partOfSpeech;
        const synonyms = d.meanings[0].synonyms.join(", ") || "None found";

        resultsContainer.innerHTML = `
            <h2 class="text-capitalize">${wordName}</h2>
            <p class="badge bg-secondary">${partOfSpeech}</p>
            <p><strong>Definition:</strong> ${definition}</p>
            <p class="text-muted"><em>"${example}"</em></p>
            <p><strong>Synonyms:</strong> ${synonyms}</p>

            <div class="mt-3">
                ${audioUrl ? `<button class="btn btn-outline-dark" onclick="new Audio('${audioUrl}').play()">🔊 Hear</button>` : ''}
                <button class="btn btn-success" onclick="saveWord('${wordName}')">⭐ Save</button>
            </div>
        `;
      })
      .catch(error => {
        resultsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
      });
}

searchButton.addEventListener("click", () => {
    const word = searchInput.value.trim();

    if (!word) {
        resultsContainer.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    addToHistory(word);
    performSearch(word);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchButton.click();
});

window.reSearch = (word) => {
    bootstrap.Offcanvas.getInstance(document.getElementById('sidebar')).hide();
    searchInput.value = word;
    searchButton.click();
};

window.saveWord = (word) => {
    const cleanWord = word.toLowerCase();

    if (!favouriteWords.includes(cleanWord)) {
        favouriteWords.push(cleanWord);
        localStorage.setItem("favouriteWords", JSON.stringify(favouriteWords));
        renderSavedWords();
    } else {
        alert("Word already saved!");
    }
};

clearBtn.addEventListener("click", () => {
    if (confirm("Clear all saved words?")) {
        favouriteWords = [];
        localStorage.removeItem("favouriteWords");
        renderSavedWords();
    }
});

clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Clear search history?")) {
        searchHistory = [];
        localStorage.removeItem("wordlyHistory");
        renderHistory();
    }
});