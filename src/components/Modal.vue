<template>
  <b-modal
    :id="id"
    ref="modal"
    :title="title"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-row>
        <b-col cols="12">
          <label>Start Date Time</label>
        </b-col>
        <b-col cols="6">
          <b-form-group>
            <b-form-datepicker id="start-datepicker" v-model="form.startDate"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group>
            <b-form-timepicker
              id="start-timepicker"
              v-model="form.startTime"
              reset-button
              locale="ja"
            ></b-form-timepicker>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col cols="12">
          <label>End Date Time</label>
        </b-col>
        <b-col cols="6">
          <b-form-group>
            <b-form-datepicker id="end-datepicker" v-model="form.endDate"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group>
            <b-form-timepicker id="end-timepicker" v-model="form.endTime" reset-button locale="ja"></b-form-timepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Summary" label-for="summary" invalid-feedback="summary is required">
            <b-form-input
              id="summary"
              v-model="form.summary"
              required
              placeholder="Input event title"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Description" label-for="description">
            <b-form-textarea
              id="description"
              v-model="form.description"
              placeholder="Input something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      form: {
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        summary: "",
        description: "",
      }
    };
  },
  props: {
    id: String,
    title: String
  },
  methods: {
    isValid() {
      return true;
    },
    resetModal() {
      this.form = {};
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.isValid()) {
        return;
      }
      this.$emit('submit', this.form)
      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(this.id);
      });
    },
  }
};
</script>