<template>
  <!-- help modal -->
  <b-modal id="help-modal" ref="help-modal">
    <div class="help-modal-header">
      <span> Help </span>
      <span @click="hideModal"> X </span>
    </div>
    <div class="help-modal-body">
      <p class="mb-4">
        Press anywhere on the axis to access values on the different stake
        periods
      </p>
      <div class="image-container">
        <img src="@/assets/images/help-image.png" />
      </div>
      <div class="btn-container mt-4">
        <button>Next</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {};
  },
  watch: {
      show: function(val1, val2) {
        this.$refs["help-modal"].show();      
      }
  },
  methods: {
    hideModal() {
      this.$refs["help-modal"].hide();
    },
  }
};
</script>