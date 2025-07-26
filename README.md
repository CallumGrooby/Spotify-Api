# Spotify-API

An app that allows users to authenticate via Spotify, search for music, and display user-specific data like playlists, top tracks, or profile information.

---

## ⚒ Tech Stack

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| React             | Frontend UI rendering             |
| Tailwind CSS      | Utility-first styling framework   |
| Node.js / Express | Backend server & API proxy        |
| Spotify Web API   | Fetching music data and user info |
| OAuth 2.0         | User authentication flow          |

---

## 📸 Screenshot



---

## ⚙ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/CallumGrooby/Spotify-Api.git
cd Spotify-Api

# Install dependencies
npm install

# Start the development server
npm start
```

Navigate to `http://localhost:3000` in your browser.

> **Note:** You will need to register a Spotify Developer App and obtain client credentials (Client ID and redirect URI).

---

## 📚 Usage Instructions

1. Click "Login with Spotify" to authenticate your account.
2. Grant access via the Spotify consent screen.
3. Search for artists, songs, or albums.
4. View user profile info, playlists, or top tracks depending on implementation.

---

## ✅ Features

- OAuth 2.0 authentication with Spotify
- Search music across Spotify's catalog
- Display user-specific data like playlists or top artists
- Responsive design for all screen sizes

---

## 🧠 Considerations

- Requires valid Spotify Developer credentials
- Token expiration handled via implicit grant or refresh logic
- Rate limiting applies to API calls

---

## 🤝 Contributing

Feel free to fork the repo and submit pull requests to improve features, UI/UX, or API integrations.

Ideas for enhancement:

- Dark mode toggle
- Add audio previews
- Pagination and infinite scrolling
- Offline storage/cache

---

## ⚖ License

MIT © Callum Grooby

