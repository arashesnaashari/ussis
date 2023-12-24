import type { MetaFunction } from "@remix-run/node";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Box } from "@chakra-ui/react";

export const meta: MetaFunction = () => {
  return [{ title: "edit" }, { name: "description", content: "edit voice !" }];
};

export default function Index() {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  return (
    // <Box backgroundColor={"red"}>
    //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolor quae
    //   dolorum modi maxime repellat cumque, doloribus delectus ratione sit
    //   consequatur iure explicabo? Eos mollitia eaque quae rem, aspernatur nemo.
    // </Box>
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="arash"
    >
      <AudioRecorder
        classes={{ AudioRecorderClass: "arash" }}
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        // showVisualizer={true}
      />
    </div>
  );
}

/*
  In case you'd like to update colors of the icons just follow the instruction here:
  
*/
