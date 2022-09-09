<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10 text-center">
        <h1 class="text-2xl my-4">Tensorflow object detection</h1>
        <div class="text-center my-2">
          <button
            class="w-32 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-2"
            @click="openCamera"
            v-if="!isStreaming"
          >
            <span>Open Camera</span>
          </button>
          <div v-else>
            <button
              class="w-32 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-2"
              @click="stopStreaming"
            >
              <span>Stop streaming</span>
            </button>
            <button
              class="w-32 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-2"
              @click="snapshot"
            >
              <span>Snapshot</span>
            </button>
          </div>
          <video ref="videoRef" autoplay="true" width="100" />
        </div>
        <div class="flex flex-wrap justify-center">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            width="200"
            ref="imgRef"
            crossorigin="anonymous"
          />
          <div class="w-full text-center my-2">
            <button
              class="w-32 rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2"
              @click="detect"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Detect object</span>
            </button>
          </div>
          <div v-if="prediction.length > 0" class="w-full text-center">
            <p>{{ prediction[0].class }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { ref } from "vue";
export default {
  setup() {
    const prediction = ref({});
    const imgRef = ref("");
    const videoRef = ref("");
    const isLoading = ref(false);
    const isStreaming = ref(false);
    const detect = async () => {
      const img = imgRef.value;
      isLoading.value = true;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      prediction.value = predictions;
      isLoading.value = false;
    };

    const openCamera = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cams = devices.filter((device) => device.kind == "videoinput");
      const camId = cams[0].deviceId;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedi({ video: { deviceId: { exact: camId } } })
          .then((stream) => {
            isStreaming = true;
            videoRef.value.srcObject = stream;
          });
      }
    };

    const stopStreaming = async () => {
      const stream = videoRef.value.srcObject;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    };

    const snapshot = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, 200, 200);
      const data = canvas.toDataURL("image/png");
      imgRef.setAttribute("src", data);
    };
    return {
      imgRef,
      prediction,
      detect,
      isLoading,
      openCamera,
      isStreaming,
      stopStreaming,
      snapshot,
    };
  },
};
</script>

<style></style>
