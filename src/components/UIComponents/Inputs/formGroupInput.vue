<template>
  <div
    class="form-group"
    :class="[
       {'input-group': hasIcon},
       {'has-danger': error},
       {'input-group-focus': focused},
       {'has-label': label || $slots.label},
       {'has-success': hasSuccess}]"
  >
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{label}}
        <span class="text-danger" v-if="required">*</span>
      </label>
    </slot>

    <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
      <span class="input-group-text">
        <slot name="addonLeft">
          <i :class="addonLeftIcon"></i>
        </slot>
      </span>
    </div>
    <slot>
      <input
        v-if="!mask"
        :value="value"
        v-on="listeners"
        v-bind="$attrs"
        class="form-control"
        :required="required"
        :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
        aria-describedby="addon-right addon-left"
      />
      <input
        v-if="mask"
        v-mask="patternMask"
        :value="value"
        v-on="listeners"
        v-bind="$attrs"
        class="form-control"
        :required="required"
        :class="[{'is-valid': hasSuccess}, inputClasses, {'is-invalid': error}]"
        aria-describedby="addon-right addon-left"
      />
    </slot>
    <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
      <span class="input-group-text">
        <slot name="addonRight">
          <i :class="addonRightIcon"></i>
        </slot>
      </span>
    </div>
    <slot name="infoBlock"></slot>
    <slot name="helpBlock">
      <div class="invalid-feedback error-text" :class="{'mt-2': hasIcon}" v-if="error">{{ error }}</div>
    </slot>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
export default {
  inheritAttrs: false,
  name: "fg-input",
  props: {
    required: {
      type: Boolean,
      description: "Whether input is required (adds an asterix *)"
    },
    label: {
      type: String,
      description: "Input label (text before input)"
    },
    error: {
      type: String,
      description: "Input error (below input)"
    },
    labelClasses: {
      type: String,
      description: "Input label css classes"
    },
    inputClasses: {
      type: String,
      description: "Input css classes"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    addonRightIcon: {
      type: String,
      description: "Addon right icon"
    },
    addonLeftIcon: {
      type: String,
      description: "Addont left icon"
    },
    mask: {
      type: Boolean,
      description: "verificar se o campo tem máscara"
    },
    patternMask: {
      type: [String, Array],
      description: "Campo Mascara"
    }
  },
  directives: { mask },
  data() {
    return {
      touched: false,
      focused: false,
      hadError: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur
      };
    },
    hasSuccess() {
      return this.hadError && this.touched && !this.error;
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    }
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value;
      if (!this.touched && value) {
        this.touched = true;
      }
      this.$emit("input", value);
    },
    onFocus(value) {
      this.focused = true;
      this.$emit("focus", value);
    },
    onBlur(value) {
      this.focused = false;
      this.$emit("blur", value);
    }
  },
  created() {
    this.$watch(
      "error",
      newVal => {
        if (newVal) {
          this.hadError = true;
        }
      },
      { immediate: true }
    );
  }
};
</script>
<style scoped>
.error-text {
  display: block;
}
</style>
