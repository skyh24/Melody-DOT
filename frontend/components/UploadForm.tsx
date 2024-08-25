"use client";

import { useState, useRef, ChangeEvent } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

//form Schema
const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  desc: z
    .string()
    .min(10, {
      message: "desc must be at least 10 characters.",
    })
    .max(200)
    .optional(),
  musicCover: z.instanceof(File, {
    message: "Music cover is required.",
  }),
  musicFile: z.instanceof(File, {
    message: "Music file is required.",
  }),
});
export default function UploadForm() {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [musicPreview, setMusicPreview] = useState<string | null>(null);

  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputMusicFile = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>("");

  const uploadFile = async () => {
    if (!coverFile) return;
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", coverFile);
      const uploadRequest = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const uploadData = await uploadRequest.json();
      setCid(uploadData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const eFile = e.target.files[0];
      if (eFile) {
        setCoverFile(eFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setCoverPreview(reader.result);
          } else {
            setCoverPreview(null);
          }
          // console.log('63',reader.result)
        };
        reader.readAsDataURL(eFile);
      }
    }
  };

  const handleMusicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setMusicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setMusicPreview(reader.result);
        } else {
          setMusicPreview(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      desc: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      {/* <input type="file" id="file" ref={inputFile} onChange={handleCoverChange} />
      <button disabled={uploading} onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload"}
      </button> */}
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <h1 className="text-4xl font-bold text-gray-700 mb-10 text-center">
          Create NFT
        </h1>
        <div className="text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-sm font-bold text-gray-500 tracking-wide">
                      Music Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your music name"
                        {...field}
                        className="text-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="musicCover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-sm font-bold text-gray-500 tracking-wide">
                      Music Cover
                    </FormLabel>
                    <FormControl>
                      {/* <div className="flex items-center justify-center w-full">
                        <div className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                          <div className="h-full w-full text-center flex flex-col items-center justify-center">
                            <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                              <img
                                className="has-mask h-36 object-center"
                                src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                alt="freepik image"
                              />
                            </div>
                            <p className="pointer-none text-gray-500">
                              <span className="text-sm">Drag and drop</span>{" "}
                              files here <br /> or{" "}
                              <a className="text-blue-600 hover:underline">
                                select a file
                              </a>{" "}
                              from your computer
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          ref={inputFile}
                          onChange={handleCoverChange}
                          id="picture"
                          type="file"
                          className="text-sm font-bold text-gray-500 tracking-wide"
                        />
                        {coverPreview && (
                          <div className="mt-2">
                            <Image
                              src={coverPreview}
                              alt="Preview"
                              className="rounded-md"
                              width={500}
                              height={500}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      <p className="text-sm text-gray-300 text-center">
                        <span>File type: MP3 types of images</span>
                      </p>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="musicFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-sm font-bold text-gray-500 tracking-wide">
                      Music File
                    </FormLabel>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          ref={inputMusicFile}
                          onChange={handleMusicChange}
                          id="musicFile"
                          type="file"
                          accept=".mp3, .wav"
                          className="text-sm font-bold text-gray-500 tracking-wide"
                        />
                        {musicPreview && (
                          <div className="mt-2">
                            <audio controls>
                              <source src={musicPreview} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      <p className="text-sm text-gray-300 text-center">
                        <span>File type: MP3 types of images</span>
                      </p>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-sm font-bold text-gray-500 tracking-wide">
                      Desc
                    </FormLabel>
                    <FormControl>
                      <Textarea className="text-sm font-bold text-gray-500 tracking-wide" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
          {/* <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                音乐名称
              </label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="your music name"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                音乐封面
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-36 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <a
                        href=""
                        id=""
                        className="text-blue-600 hover:underline"
                      >
                        select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    id="file"
                    ref={inputFile}
                    onChange={handleCoverChange}
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: png,jpeg types of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </main>
  );
}
