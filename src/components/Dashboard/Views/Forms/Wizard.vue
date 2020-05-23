<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mr-auto ml-auto">
        <wizard @complete="wizardComplete">
          <template slot="header">
            <h3 class="ca rd-title">Build your profile</h3>
            <h3 class="description">This information will let us know more about you.</h3>
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="nc-icon nc-single-02"></i>
              Cliente
            </template>
            <first-step ref="step1" @on-validated="onStepValidated"></first-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="nc-icon nc-paper"></i>
              Orçamento
            </template>
            <second-step ref="step2" @on-validated="onStepValidated"></second-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="nc-icon nc-check-2"></i>
              Resumo
            </template>
            <third-step :data="wizardModel" ref="step3"></third-step>
          </wizard-tab>
        </wizard>
      </div>
    </div>
  </div>
</template>
<script>
import FirstStep from "./Wizard/FirstStep.vue";
import SecondStep from "./Wizard/SecondStep.vue";
import ThirdStep from "./Wizard/ThirdStep.vue";
import swal from "sweetalert2";
import { Wizard, WizardTab } from "src/components/UIComponents";
import { Button } from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      wizardModel: {}
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    Wizard,
    WizardTab
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
      console.log(this.wizardModel);
    },
    wizardComplete() {
      let dados = {
        data_de_validade: this.wizardModel.dataValidade,
        data_de_orcamento: this.wizardModel.dataHoraOrcamento,
        servicos: this.wizardModel.servicos,
        pagamentos: this.wizardModel.pagamentos,
        cliente: {
          nome: this.wizardModel.Nome,
          telefone: this.wizardModel.telefone,
          email: this.wizardModel.email
        }
      };
      axios.post("http://localhost:3000/orc/", dados).then(r => {
        swal("Sucesso!", "Orçamento cadastrado com sucesso", "success");
        dados["idOrcamento"] = r.data.id;
        localStorage.setItem("orcamento",JSON.stringify(dados));
        this.$router.push({
          name: "relatorio",
        });
      });

      //  window.location.href='src\components\Dashboard\Views\Forms\Wizard\relatorio.vue'
    }
  }
};
</script>
