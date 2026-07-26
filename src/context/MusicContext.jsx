import { Children, createContext, useContext, useState } from "react";

export const MusicContext = createContext();

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
  const [allsongs, setAllSongs] = useState(songs);
  const [currentTrack, setcurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isplaying, setisPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handlePlaySong = (song, index) => {
    setcurrentTrack(song);
    setcurrentTrackIndex(index);
  };

  const nextTrack = () => {
    setcurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allsongs.length;
      setcurrentTrack(allsongs[nextIndex]);
      return nextIndex;
    });
    setisPlaying(false);
  };

  const prevTrack = () => {
    setcurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allsongs.length - 1 : prev - 1;
      setcurrentTrack(allsongs[nextIndex]);
      return nextIndex;
    });
    setisPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => setisPlaying(true);
  const pause = () => setisPlaying(false);

  return (
    <MusicContext.Provider
      value={{
        allsongs,
        handlePlaySong,
        currentTrackIndex,
        currentTrack,
        currentTime,
        setcurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        isplaying,
        setisPlaying,
        play,
        pause,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic must be used inside of musicprocider ");
  }

  return contextValue;
};
