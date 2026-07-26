import { useEffect, useRef } from "react";
import { useMusic } from "../context/MusicContext";

export const MusicPlayer = () => {
  const {
    currentTrack,
    formatTime,
    currentTime,
    duration,
    setDuration,
    setcurrentTime,
    nextTrack,
    prevTrack,
    isplaying,
    setisPlaying,
    play,
    pause,
    volume,
    setVolume,
  } = useMusic();
  const audioref = useRef(null);

  const handleTimeChange = (e) => {
    const audio = audioref.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setcurrentTime(newTime);
  };

  const handleVolChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
  };

  useEffect(() => {
    const audio = audioref.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioref.current;
    if (!audio) return;

    if (isplaying) {
      audio.play().catch((err) => console.error(err));
    } else {
      audio.pause();
    }
  }, [isplaying]);

  useEffect(() => {
    const audio = audioref.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setcurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setDuration, setcurrentTime, currentTrack, nextTrack]);

  useEffect(() => {
    const audio = audioref.current;
    if (!audio) return;

    audio.load();
    setcurrentTime(0);
    setDuration(0);
  }, [currentTrack, setcurrentTime, setDuration]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      <audio
        ref={audioref}
        src={currentTrack.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime || 0}
          className="progress-bar"
          onChange={handleTimeChange}
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={prevTrack}>
          ⏮
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isplaying ? pause() : play())}
        >
          {isplaying ? "⏸" : "▶"}
        </button>
        <button className="control-btn" onClick={nextTrack}>
          ⏭
        </button>
      </div>

      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="volume-bar"
          onChange={handleVolChange}
          value={volume}
        />
      </div>
    </div>
  );
};
