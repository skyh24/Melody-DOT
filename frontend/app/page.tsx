"use client";

import { PlayerProvider, PlayGround } from "@/components/player";

// import Player from "@madzadev/audio-player";
// import "@madzadev/audio-player/dist/index.css";
const tracks = [
  {
    url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
    title: "Madza - Chords of Life",
    tags: ["house"],
  },
  {
    url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
    title: "Madza - Late Night Drive",
    tags: ["dnb"],
  },
  {
    url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
    title: "Madza - Persistence",
    tags: ["dubstep"],
  },
];
export default function Home() {
  return (
    <main>
      {/* <Player
        trackList={tracks}
        includeTags={true}
        includeSearch={true}
        showPlaylist={true}
        sortTracks={true}
        autoPlayNextTrack={true}
      /> */}
      <PlayerProvider>
        <PlayGround />
      </PlayerProvider>
    </main>
  );
}
