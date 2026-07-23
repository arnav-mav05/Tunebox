import { MusicPlayer } from "./components/MusicPlayer";
import {Allsongs} from "./components/Allsongs"
import { Playlists } from "./components/Playlists";

import { BrowserRouter , Route , Routes } from "react-router";

 function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <main className="app-main">
        <div className="player-section">
          <MusicPlayer/>
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element={<Allsongs/>} />
            <Route path="/playlists" element={<Playlists/>} />
          </Routes>
        </div>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;