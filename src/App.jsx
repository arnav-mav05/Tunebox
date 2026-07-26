import { MusicPlayer } from "./components/MusicPlayer";
import { Allsongs } from "./components/Allsongs";
import { Playlists } from "./components/Playlists";
import { MusicProvider } from "./context/MusicContext";

import { BrowserRouter, Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app">
          {<Navbar />}
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<Allsongs />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  );
}

export default App;
