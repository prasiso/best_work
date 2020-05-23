<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <h5 class="info-text">Resumo do Orçamento</h5>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6">
        <img src="\static\img\logo\logo.png" alt="Logo da Empresa" />
      </div>
    </div>
    <div class="col-8">
      <label for="Nome">Nome do cliente</label>
      <p id="Firstep">{{data.Nome}}</p>
    </div>
    <div class="col-4">
      <label for="Nome">Telefone</label>
      <p id="Firstep">{{data.telefone}}</p>
    </div>
    <div class="col-4">
      <label for="Nome">Email</label>
      <p id="Firstep">{{data.email}}</p>
    </div>
    <div class="col-4">
      <label for="Nome">Data do orçamento</label>
      <p id="SecondStep">{{data.dataHoraOrcamento.toLocaleString()}}</p>
    </div>
    <div class="col-4">
      <label for="Nome">Data de Validade</label>
      <p id="SecondStep">{{data.dataValidade.toLocaleDateString()}}</p>
    </div>
    <div class="col-4">
      <label for="Nome">Serviço</label>
      <div id="SecondStep" v-for="o in data.servicos" :key="o.index">
        <p>{{o.servico}}</p>
      </div>
    </div>
    <div class="col-4">
      <label for="Nome">Quantidade</label>
      <div id="SecondStep" v-for="o in data.servicos" :key="o.index">
        <p>{{o.quant}}</p>
      </div>
    </div>
    <div class="col-4">
      <label for>Valor</label>
      <div id="SecondStep" v-for="o in data.servicos" :key="o.index">
        <p>R$ {{Number(o.valor).toFixed(2)}}</p>
      </div>
    </div>
    <div class="col-8">
      <label for>Metodo de pagamento</label>
      <div id="SecondStep" v-if="data.pagamentos.credito == true">Cartão de crédito</div>
      <div id="SecondStep" v-if="data.pagamentos.debito == true">Cartão de débito</div>
      <div id="SecondStep" v-if="data.pagamentos.dinheiro == true">Dinehiro</div>
    </div>
    <div class="col-4">
      <label for>Sub-total</label>
      <div
        id="SecondStep"
      >{{Number(data.servicos.reduce(function(total, numero){return total + (numero.valor * numero.quant);}, 0)).toFixed(2)}}</div>
    </div>
    <!--
    <div class="row justify-content-center mx-auto">
      <div class="col-md-4" style="padding-top: 25px; text-align: center ">Nome completo</div>
      <div class="col-md-4" style="padding-top: 25px; text-align: center">Telefone</div>
      <div class="col-md-4" style="padding-top: 25px; text-align: center">E-mail</div>
      <div class="col-md-4" style="padding-bottom: 5px; text-align: center">Kelwin Simões de Souza</div>
      <div class="col-md-4" style="padding-bottom: 5px; text-align: center">(21)985357208</div>
      <div class="col-md-4" style="padding-bottom: 5px; text-align: center">kelwinsimoesdesouza<br>@gmail.com</div>
      <div class="col-md-4" style="padding-top: 5px; text-align: center">Data de orçamento</div>
      <div class="col-md-4" style="padding-top: 5px;text-align: center">Data de validade</div>
      <div class="col-md-4" style="padding-top: 5px; text-align: center">Serviços</div>
      <div class="col-md-4" style="text-align: center">05/05/2020</div>
      <div class="col-md-4" style="text-align: center">12/05/2020</div>
      <div class="col-md-4" style="text-align: center">Poliamento</div>
      <div class="col-md-4"></div>
      <div class="col-md-4" style="padding-top: 10px; text-align: center">Valor</div>
      <div class="col-md-4"></div>
      <div class="col-md-4"></div>
      <div class="col-md-4" style="text-align: center">R$89,00</div>
      <div class="col-md-4"></div>
    </div>
    -->
  </div>
</template>
<script>
import { Card } from "src/components/UIComponents";
import { Wizard, WizardTab } from "src/components/UIComponents";
import { Select, Option } from "element-ui";
import { Table, TableColumn } from "element-ui";
import { json } from "d3";
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    data: {
      type: Object,
      description: "Passar dados para a tela"
    }
  },
  data() {
    return {
      model: {
        street: "",
        streetNo: "",
        city: "",
        country: ""
      },
      countryOptions: ["One", "Two", "Three", "Four", "Five", "Six"],
      modelValidations: {
        street: {
          required: true,
          min: 5
        },
        streetNo: {
          required: true,
          min: 5
        },
        city: {
          required: true
        },
        country: {
          required: true
        }
        
      }
    };
  },
  mounted() {
    console.log(this.data);
    console.log(this.data.servicos);
    let xpto = JSON.parse(JSON.stringify(this.data));
    (this.total = 0),
      xpto.servicos.forEach(el => {
        this.total += el.quant * el.valor;
      });
  },
  created() {
   
  },
  methods: {
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
<style>
</style>
