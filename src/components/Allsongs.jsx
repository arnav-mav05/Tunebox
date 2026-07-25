import { useMusic } from "../hooks/useMusic";

export const Allsongs = () => {
    const { allsongs , handlePlaySong , currentTrackIndex } = useMusic();
    return (
        <div className="all-songs">
            <h2>ALL Songs ({allsongs.length})</h2>
            <div className="songs-grid">
                {allsongs.map((song , key) => (
                    <div key={key} 
                    className={`song-card ${currentTrackIndex === key ? "active" : ""}`} 
                    onClick={() => handlePlaySong(song , key) }>
                        <div className="song-info">
                            <h3 className="song-title">{song.title}</h3>
                            <p className="song-artist">{song.artist}</p>
                            <span>{song.duration}</span>
                        </div>
                        <div className="play-button">
                            {currentTrackIndex === key ? "♪" : "▶"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}