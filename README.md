WORDSMITH is a sleek, responsive web-based dictionary application that allows users to look up word definitions, parts of speech, synonyms, and even hear the correct pronunciation in real-time.
Built with JavaScript, Bootstrap 5, CSS, HTML and the Free Dictionary API, it provides a seamless experience for language learners and writers alike.
The features are:
Instant Search: Get definitions, examples, and synonyms immediately.

Audio Pronunciation: Integrated text-to-speech support to hear how words are pronounced.

Save Favorites: Bookmark words to your "Saved Words" list for later study.

Search History: Automatically tracks your last 5 searches so you never lose your place.

Persistent Storage: Uses localStorage to ensure your saved words and history remain even after refreshing the page.

Responsive Design: Fully optimized for mobile, tablet, and desktop views using Bootstrap
Its built with :
HTML5 & CSS3: For structure and custom styling.

Bootstrap 5: For responsive layout and UI components (cards, buttons, input groups).

Vanilla JavaScript (ES6+): For DOM manipulation and API integration.

Free Dictionary API: Powers the word data and audio files.

The app fetches data from https://api.dictionaryapi.dev/api/v2/entries/en/{word}. It dynamically handles errors, such as when a word is not found in the database.

LocalStorage Management
The app keeps track of two distinct arrays:

favouriteWords: Stores words you've starred.

wordlyHistory: Stores a rolling history of your recent searches (capped at 5).

UI Components
Search Bar: Triggers search on click or when the "Enter" key is pressed.

Results Card: Displays part of speech, definitions, and usage examples.

Management Buttons: Allows users to clear their history or saved list with a single click (includes a confirmation prompt for safety).

🤝 Contributing
Contributions are welcome! If you have ideas for new features (
 feel free to fork the repo and submit a pull request.
