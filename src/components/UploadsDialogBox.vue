<template>
  <v-card max-width="600" class="mx-auto" elevation="0">
    <v-card-text>
      <div
        class="custom-dropzone text-center"
        @click="fileInput?.click()"
      >
        <!-- <p v-if="isOverDropZone">Dropping files here</p> -->
        <p>Click to excel choose</p>
        <v-file-input
          class="d-none"
          ref="fileInput"
          v-model="filesArray[0]"
          accept=".xlsx"
        ></v-file-input>
      </div>
      <div v-if="filesArray.length > 0">
        <v-chip class="ma-1" v-for="(file, index) in filesArray" :key="file?.name"
          >{{ file?.name?.length > 30 ? file?.name?.slice(0, 30) : file?.name
          }}<span @click="removeFile(index)" class="ml-1 cursor-pointer"
            ><v-icon>mdi-close</v-icon></span
          ></v-chip
        >
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn :loading="uiStore.loading" class="bg-btn_bg mx-auto" @click="filesArray.length > 0 ? createQRCode() : ''"
        >Generate</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
import { postFileHandler } from "@/utils/httpHandler";
import { useDropZone } from "@vueuse/core";

const uiStore = useUiStore();
const dropZoneRef = ref<HTMLDivElement>();
const fileInput = ref<HTMLElement>();
const filesArray = ref<any>([]);
const QrCodeFile = ref<any>();

const emit = defineEmits(["update:fileData", "update:fileName", "update:zip"]);

// // called when files are dropped on zone
// function onDrop(files: File[] | any) {
//   for (let x of files) {
//     filesArray.value.push(x);
//   }
// }
// function accessFiles(event: any) {
//   const files = event.target.files;
//   console.log(files, 'jksssssssss')
//   if (files.length > 0) {
//     filesArray.value[0] = files[0] 
//   }
// }

// const { isOverDropZone } = useDropZone(dropZoneRef, {
//   onDrop,
//   // specify the types of data to be received.
//   // dataTypes: ["image/jpeg"],
// });

const removeFile = (item: any) => {
  filesArray.value.splice(item, 1);
};

const createQRCode = () => {
  uiStore.loading = true
  const data = new FormData();
  data.append("file", filesArray.value[0]);
  postFileHandler("/qrcode", data, false)
    .then((res) => {
      // Create a Blob from the byte array
      // Create a URL for the Blob
      QrCodeFile.value = URL.createObjectURL(new Blob([res], {type : 'application/zip'}));
      emit("update:fileData", QrCodeFile.value);
      emit("update:fileName", "QrCodezip");
      filesArray.value = []
    })
    .catch((error) => {
      uiStore.alertText = error;
      uiStore.alert = true;
    })
    .finally(()=>{
      uiStore.loading = false
    })
};
</script>
<style scoped>
.custom-dropzone {
  border-style: dashed;
  border-width: 3px;
  border-color: #1f4e79;
  padding: 120px;
  color: rgb(114, 114, 114);
}
</style>
