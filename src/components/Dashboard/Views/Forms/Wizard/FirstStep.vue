<template>
  <div>
    <h5 class="info-text">Informações do Cliente</h5>
    <div class="row justify-content-center">
      <div class="col-sm-10">
        <label for="nome">Nome do Cliente</label>
        <fg-input
          id="nome"
          name="Nome"
          placeholder="Nome Completo"
          v-model="model.Nome"
          v-validate="modelValidations.Nome"
          addon-left-icon="nc-icon nc-single-02"
        ></fg-input>
        <label for="nome">Telefone do Cliente</label>
        <fg-input
          id="telefone"
          name="telefone"
          placeholder="Telfone"
          v-model="model.telefone"
          v-validate="modelValidations.telefone"
          addon-left-icon="nc-icon nc-mobile"
          :mask="true"
          :patternMask="['(##) ####-####', '(##) #####-####']"
        ></fg-input>
      </div>
      <div class="col-12 col-sm-10">
        <label for="email">Email do Cliente</label>
        <fg-input
          id="email"
          name="email"
          placeholder="E-mail do Cliente"
          v-model="model.email"
          v-validate="modelValidations.email"
          addon-left-icon="nc-icon nc-send"
        ></fg-input>
      </div>
    </div>
  </div>
</template>
<script>
import { Upload } from "element-ui";
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option
} from "element-ui";
export default {
  components: {
    [Upload.name]: Upload,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect
  },
  data() {
    return {
      model: {
        Nome: "",
        telefone: "",
        email: ""
      },
      modelValidations: {
        Nome: {
          required: true
        },
        telefone: {
          required: true,
          min: 10
        },
        email: {
          required: true,
          email: true
        }
      }
    };
  },
  methods: {
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res, this.model);
        return res;
      });
    }
  }
};
</script>
<style lang="scss">
.card-wizard .picture-container .picture {
  input[type="file"] {
    display: none;
  }
}
</style>
