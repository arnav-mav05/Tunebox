import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();

const songs = [
  {
    id: 1,
    title: "Blinding lights",
    artist: "Weeknd",
    url: "/songs/blindinglights.mp3",
    duration: "3:19",
  },
  {
    id: 2,
    title: "Dancing in the flames",
    artist: "Weeknd",
    url: "/songs/flames.mp3",
    duration: "3:37",
  },
  {
    id: 3,
    title: "Gasoline",
    artist: "Weeknd",
    url: "/songs/gasoline.mp3",
    duration: "4:09",
  },
  {
    id: 4,
    title: "High for this",
    artist: "Weeknd",
    url: "/songs/highforthis.mp3",
    duration: "4:14",
  },
  {
    id: 5,
    title: "Love me harder",
    artist: "Weeknd",
    url: "/songs/lovemeharder.mp3",
    duration: "4:15",
  },
  {
    id: 6,
    title: "Moth to a flame",
    artist: "Weeknd",
    url: "/songs/moth.mp3",
    duration: "3:54",
  },
  {
    id: 7,
    title: "Openhearts",
    artist: "Weeknd",
    url: "/songs/openhearts.mp3",
    duration: "3:54",
  },
  {
    id: 8,
    title: "Popular",
    artist: "Weeknd",
    url: "/songs/popular.mp3",
    duration: "3:26",
  },
];

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlayerPlaylists");
    if (savedPlaylists) {
      const playlists = JSON.parse(savedPlaylists);
      setPlaylists(playlists);
    }
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
    } else {
      localStorage.removeItem("musicPlayerPlaylists");
    }
  }, [playlists]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrackIndex,
        currentTrack,
        setCurrentTime,
        currentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        createPlaylist,
        playlists,
        addSongToPlaylist,
        setCurrentTrack,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used inside of MusicProvider");
  }

  return contextValue;
};