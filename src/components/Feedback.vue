<script setup lang="ts">
  import { useUiStore } from '@/stores/ui'

  const uiStore = useUiStore()
</script>

<template>
  <v-snackbar
    v-model="uiStore.alert"
    :color="uiStore.alertStatus ? 'success' : 'error'"
    location="top right"
    :timeout="3000"
  >
    <div class="d-flex ga-1 align-center">
      <p class="text-body-1 font-weight-medium">{{ uiStore.alertText }}</p>
    </div>
    <template #actions>
      <v-icon
        :icon="uiStore.alertStatus ? 'mdi-check-circle' : 'mdi-close-circle'"
        @click="uiStore.alert = false"
      />
      <!-- <v-btn variant="text" >
                Close
            </v-btn> -->
    </template>
  </v-snackbar>
</template>
