import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdPlayCircle } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SecondNFT from "@/components/SecondNFT";
export const PlayGround = () => {
  const { playList, setCurrentMusic, currentMusic } = usePlayer();

  return (
    <div className="relative">
      {playList.map((music, idx) => {
        const isPlaying = currentMusic.src === music.src;
        // console.log(isPlaying);
        return (
          <div
            key={music.id}
            // className={`
            //   ${isPlaying ? " border-accent-500" : "border-transparent"}
            //    flex gap-2 text-xs relative cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-none bg-gradient-radial rounded-2xl overflow-hidden text-white border-2 border-dashed`}
            className={`
            flex justify-between items-center gap-2 text-xs my-4 py-4 border-t-2 border-b-2 border-slate-700 relative cursor-pointer transition-shadow duration-300 shadow-lg overflow-hidden text-white`}
          >
            <div>{idx + 1}</div>
            {/* LEFT */}
            <div
              className="w-24 h-24 relative group"
              onClick={() => {
                setCurrentMusic(music, true);
              }}
            >
              {music.thumbnail ? (
                <img
                  src={music.thumbnail}
                  alt={music.title}
                  className="rounded-lg h-full w-full object-cover"
                />
              ) : (
                <DefaultThumbnail />
              )}

              {/* Hover Mask */}
              <div className="flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MdPlayCircle className="text-5xl" />
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-5/6 flex flex-col gap-2 justify-center bg-gradient-to-l from-zinc-700   p-6">
              <h6 className="font-semibold text-sm">{music.title}</h6>
              <p className="text-xs text-gray-400">{music.artist}</p>

              <Sheet>
                <SheetTrigger className="flex justify-center text-primary items-center bg-accent hover:bg-accent-hover px-4 py-4 rounded-full flex items-center gap-2 absolute right-4 top-1/2 transform -translate-y-1/2">
                  <FaEdit />
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SecondNFT music={music} />
                </SheetContent>
              </Sheet>
            </div>

            {/* <div className="w-1/12 flex justify-center items-center text-3xl bg-black/10">
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </div> */}
          </div>
        );
      })}
    </div>
  );
};
