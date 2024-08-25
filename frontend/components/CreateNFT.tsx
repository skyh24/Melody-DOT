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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";

// Simplified schema without file validation
const formSchema = z.object({
  // musicFile: "", 
});
export default function CreateNFT() {
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicPreview, setMusicPreview] = useState<string | null>(null);

  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputMusicFile = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>("");

  const uploadFile = async () => {
    if (!musicFile) return;
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", musicFile);
      console.log(musicFile);

      //FIRST UPLOAD
      const uploadRequest = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const res = await uploadRequest.json();
      if (res && res.IpfsHash) {
        setCid(res.IpfsHash);

        //SECOND Json
        const secDataParams = {
          image: `ipfs://${res.IpfsHash}/${musicFile.name}`, // Assuming file name is used in the path
          mediaUri: `ipfs://${res.IpfsHash}/${musicFile.name}`, // Assuming file name is used in the path
          attributes: [], // Add attributes if needed
          name: musicFile.name, // Or any other name logic you have
          description: ".", // Update description if necessary
        };
        console.log(secDataParams);
        // secDataParams to JSON Blob
        const jsonBlob = new Blob([JSON.stringify(secDataParams, null, 2)], {
          type: "application/json",
        });
        // create FormData OBJ to JSON Blob
        const jsonFormData = new FormData();
        jsonFormData.append("file", jsonBlob, "metadata.json"); // "metadata.json" 是文件名

        // SECOND UPLOAD
        const secondUploadRequest = await fetch("/api/upload", {
          method: "POST",
          body: jsonFormData,
        });
        const secondRes = await secondUploadRequest.json();
        console.log("Second upload response:", secondRes);

        //LOADING false
        setUploading(false);
      } else {
        console.error("No IpfsHash in response.");
      }
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
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
    defaultValues: {},
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (musicFile) {
      uploadFile();
      console.log(values);
    } else {
      alert("Please select a music file.");
    }
  }
  return (
    <main className="w-full m-auto ">
      <div className="w-full m-auto sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mt-24">
        <h1 className="text-4xl font-bold text-gray-700 mb-10 text-center">
          Create NFT
        </h1>
        <div className="text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <span className="pl-2 text-sm text-gray-300 text-center">
                        File type: MP3 types of file
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" disabled={uploading}>
                  {uploading && (
                    <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* TEST Basic  */}
      {/* <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={handleCoverChange}
      />
      <button disabled={uploading} onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload"}
      </button> */}
    </main>
  );
}
