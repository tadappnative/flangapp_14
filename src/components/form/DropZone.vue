<template>
  <div
      :class="['dropzone', dragging ? 'dragenter' : '']"
      @dragenter="handleEnter"
      @dragend="handleEnd"
      @dragleave="handleLeave"
      @dragover="handleOver"
  >
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex justify-start align-center">
        <v-avatar
            size="50"
            color="whitesmoke"
            class="mr-4"
        >
          <div class="primary--text" style="width: 28px; height: 28px">
            <UploadIcon :size="28"/>
          </div>
        </v-avatar>
        <div class="body-1">
          <span v-text="!file ? label : name" />
        </div>
      </div>
      <div v-if="file">
        <v-btn
            icon
            color="danger"
            style="z-index: 203"
            @click.prevent="clean"
        >
          <DeleteMiniIcon :size="16"/>
        </v-btn>
      </div>
    </div>
    <input
        type="file"
        ref="inputFile"
        @change="onFileChange"
    >
  </div>
</template>

<script>
import UploadIcon from "@/components/icons/UploadIcon";
import DeleteMiniIcon from "@/components/icons/DeleteMiniIcon";
export default {
  name: 'DropZone',
  components: {
    UploadIcon,
    DeleteMiniIcon
  },
  props: {
    label: {
      type: String,
      required: true
    },
  },
  data: () => ({
    dragging: false,
    file: null,
    name: ""
  }),
  methods: {
    handleOver() {
      console.log("over")
    },
    handleLeave() {
      this.dragging = false;
    },
    handleEnd() {
      console.log("end");
    },
    handleEnter() {
      this.dragging = true;
    },
    onFileChange(e) {
      this.dragging = false;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createFile(files[0]);
    },
    createFile(file) {
      this.file = file;
      this.name = file.name;
      this.$emit("update", file);
    },
    clean() {
      this.file = null;
      this.name = "";
      this.dragging = false;
      this.$refs.inputFile.value = null;
      this.$emit("update", null);
    }
  },
}
</script>