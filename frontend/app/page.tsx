"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlayerProvider, PlayGround } from "@/components/player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardStack, Highlight } from "@/components/ui/card-stack";
import { Cover } from "@/components/ui/cover";

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are incredible! 🌟 I’m excited to integrate them into our
        Web3 music and NFT projects. Framer Motion is an absolute game-changer
        for bringing our vision to life. 🙌
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];

export default function Home() {
  return (
    <main className="w-full overflow-auto relative">
      {/* TITLE */}
      <BackgroundBeamsWithCollision>
        <h1
          className="my-20 text-center text-4xl md:text-4xl lg:text-6xl font-semibold"
          style={{ lineHeight: "5rem" }}
        >
          Build stunning NFT and music experiences <br /> at &nbsp;
          <Cover>lightning speed</Cover>
        </h1>
      </BackgroundBeamsWithCollision>

      <div className=" flex items-center w-full gap-4 px-20 md:mx-auto mt-6 mb-20">
        <div className=" w-4/5 border-r pr-8">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Music</TabsTrigger>
              <TabsTrigger value="password">News</TabsTrigger>
            </TabsList>
            <TabsContent value="account">all</TabsContent>
            <TabsContent value="password">news</TabsContent>
          </Tabs>
          <PlayerProvider>
            <PlayGround />
          </PlayerProvider>
        </div>
        <div className="w-1/5">{/* <CardStack items={CARDS} /> */}</div>
      </div>

      <div className="my-60"></div>
    </main>
  );
}
