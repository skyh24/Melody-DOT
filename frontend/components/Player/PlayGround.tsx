import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";

export const PlayGround = () => {
  const { playList, setCurrentMusic, currentMusic } = usePlayer();
  return (
    <main>
      <div className="flex flex-col max-w-xs gap-4 mx-4 md:mx-auto mt-6 mb-20">
        {playList.map((music) => {
          const isPlaying = currentMusic.src === music.src;
          return (
            <div
              key={music.id}
              onClick={() => {
                setCurrentMusic(music, true);
              }}
              className={`${
                isPlaying ? " border-accent-500" : "border-transparent"
              } flex gap-2 text-xs relative cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-none bg-gradient-radial from-[#aab1ff] to-[#6c7bff] rounded-2xl overflow-hidden text-white border-2 border-dashed`}
            >
              <div className="w-3/12 h-24">
                {music.thumbnail ? (
                  <img
                    src={music.thumbnail}
                    alt={music.title}
                    className="rounded-lg h-full w-full object-cover"
                  />
                ) : (
                  <DefaultThumbnail />
                )}
                {/* <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="text-3xl text-white">
                    {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
                  </div>
                </div> */}
              </div>

              <div className="w-8/12 flex flex-col gap-2 justify-center">
                <h6 className="font-semibold text-sm">{music.title}</h6>
                <p className="text-xs text-gray-400">{music.artist}</p>
              </div>

              {/* <div className="w-1/12 flex justify-center items-center text-3xl bg-black/10">
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </div> */}
            </div>
          );
        })}
      </div>
    </main>
  );
};
