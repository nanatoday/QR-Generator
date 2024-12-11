<template>
  <v-responsive class="fill-height bg-main_bg">
    <div class="h-100" style="padding: 5% 10%">
      <v-row class="h-100 elevation-2 rounded-lg bg-white">
        <v-col cols="12" md="8" class="py-10">
          <v-radio-group
            class="mb-15"
            v-model="fieldType"
            inline
            color="header"
            hide-details
          >
            <v-radio label="Text" value="Text" class="ml-auto mr-1"></v-radio>
            <v-radio label="File" value="File" class="mr-auto"></v-radio>
          </v-radio-group>
          <div v-if="fieldType === 'Text'" class="text-center pt-15">
            <v-form @submit.prevent="QrCodeText ? createQRCode() : ''">
              <v-text-field
                class="mx-auto"
                v-model="QrCodeText"
                label="Provide QR code details"
                max-width="570"
                variant="underlined"
                :rules="[formStore.rules.required, formStore.rules.qrText]"
              ></v-text-field>
              <v-btn :loading="uiStore.loading" class="bg-btn_bg" type="submit"
                >Generate</v-btn
              >
            </v-form>
          </div>
          <uploads-dialog-box
            v-else
            v-model:file-data="QrCodeZip"
            v-model:file-name="fileName"
          />
        </v-col>
        <v-col cols="12" md="4" class="bg-header rounded-e-lg overflow-hidden">
          <v-row class="h-100 justify-center" no-gutters>
            <v-col cols="12" class="align-self-end text-center">
              <v-img
                v-if="fieldType === 'Text' && QrCodeContent"
                height="350"
                :src="QrCodeContent"
              ></v-img>
              <v-img v-if="fieldType === 'File' && QrCodeZip" height="250" src="/zip.png"></v-img>
            </v-col>
            <v-col
              v-if="fieldType === 'Text'"
              cols="12"
              class="text-center mt-5"
            >
              <a
                :disabled="!QrCodeContent"
                :href="QrCodeContent"
                :download="fileName"
              >
                <v-btn
                  :loading="uiStore.loading"
                  size="x-large"
                  class="bg-btn_bg text-capitalize"
                  >Download</v-btn
                >
              </a>
            </v-col>
            <v-col v-else cols="12" class="text-center mt-5">
              <a :disabled="!QrCodeZip" :href="QrCodeZip" :download="fileName">
                <v-btn
                  :loading="uiStore.loading"
                  size="x-large"
                  class="bg-btn_bg text-capitalize"
                  >Download</v-btn
                >
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-responsive>
</template>

<script lang="ts" setup>
//
import { useFormStore } from "@/stores/form";
import { useUiStore } from "@/stores/ui";
import { postFileHandler } from "@/utils/httpHandler";

const formStore = useFormStore();
const uiStore = useUiStore();
const fieldType = ref<string>("Text");
const QrCodeText = ref<string>("");
const fileName = ref<string>("");
const QrCodeContent = ref<any>();
const QrCodeZip = ref<any>(false);
const createQRCode = () => {
  uiStore.loading = true;
  const data = new FormData();
  data.append("name", QrCodeText.value);
  postFileHandler("/qrcode", data, false)
    .then((res) => {
      // Create a Blob from the byte array
      // Create a URL for the Blob
      QrCodeContent.value = URL.createObjectURL(
        new Blob([res], { type: "image/png" })
      );
      fileName.value = QrCodeText.value;
    })
    .catch((error) => {
      uiStore.alertText = error;
      uiStore.alert = true;
    })
    .finally(() => {
      uiStore.loading = false;
    });
};
</script>
