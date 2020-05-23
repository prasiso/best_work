<template>
  <div>
    <h5 class="info-text">Informações sobre o serviço</h5>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-md-6">
            <label for="Do">Data de orçamento</label>
            <div class="form-group">
              <el-date-picker
                v-model="model.dataHoraOrcamento"
                type="datetime"
                v-validate="modelValidations.dataHoraOrcamento"
                format="dd/MM/yyyy HH:mm:ss"
                placeholder="Data Orcamento"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </div>
          </div>
          <div class="col-md-6">
            <label for="dv">Data de Validade</label>
            <el-date-picker
              format="dd/MM/yyyy"
              v-model="model.dataValidade"
              v-validate="modelValidations.dataValidade"
              type="date"
              placeholder="Data de Validade"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </div>
          <Form @submit="pushOrcamento($event)">
            <div class="row">
              <div class="col-md-12">
                <label for="servico">Serviço</label>
                <input
                  id="servico"
                  type="text"
                  placeholder="Serviço"
                  class="form-control"
                  v-model="obj.servico"
                />
              </div>
              <div class="col-md-6">
                <label for="Quant">Quantidade</label>
                <input
                  id="quant"
                  type="number"
                  placeholder="Quantidade"
                  class="form-control"
                  v-model="obj.quant"
                />
              </div>
              <div class="col-md-6">
                <label for="Valor">Valor</label>
                <input type="text" placeholder="Valor" class="form-control" v-model="obj.valor" v-money="money"/>
              </div>
              <div class="col-md-12"></div>
              <div class="col-md-12">
                <button
                  type="submit"
                  :disabled="obj.valor<=0 || obj.quant<=0 || obj.servico == ''"
                  class="btn btn-success pull-right"
                >
                  <span class="btn-label">
                    <i class="nc-icon nc-simple-add"></i>
                  </span>
                  ADICIONAR
                </button>
              </div>
            </div>
          </Form>
          <div class="col-md-12" style="padding-top: -5px">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title"></h5>
              </div>
              <div class="card-body row">
                <div class="col-sm-12">
                  <el-table
                    :data="model.servicos"
                    emptyText="Não há dados"
                    header-row-class-name="text-primary"
                  >
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="servico" label="Serviço"></el-table-column>
                    <el-table-column prop="quant" label="quant."></el-table-column>
                    <el-table-column prop="valor" label="Valor"></el-table-column>
                    <el-table-column
                      class-name="action-buttons td-actions"
                      align="right"
                      label="Ação"
                    >
                      <template slot-scope="props">
                        <p-button type="danger" size="sm" icon @click="apagarOrcamento(props.row)">
                          <i class="fa fa-times"></i>
                        </p-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <span class="pull-right">R$ {{total.toFixed(2)}}</span>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <br />
              <h6>Formas de pagamento</h6>

              <p-checkbox id="pgto" v-model="model.pagamentos.dinheiro" :inline="true">Dinheiro</p-checkbox>
              <p-checkbox
                id="pgto"
                v-model="model.pagamentos.credito"
                :inline="true"
              >Cartão de Crédito</p-checkbox>
              <p-checkbox
                id="pgto"
                v-model="model.pagamentos.debito"
                :inline="true"
              >Cartão de Débito</p-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { IconCheckbox } from "src/components/UIComponents";
import Vue from "vue";
import { Table, TableColumn } from "element-ui";
import PSwitch from "src/components/UIComponents/Switch.vue";
 import {VMoney} from 'v-money'
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

Vue.use(Table);
Vue.use(TableColumn);

export default {
  components: {
    IconCheckbox,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    PSwitch
  },
  data() {
    return {
      money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
      modelValidations: {
        servicos: {
          min: 1
        },
        pagamento: {
          min: 1
        },
        dataHoraOrcamento: {
          required: true
        },
        dataValidade: {
          required: true
        }
      },
      obj: {
        servico: "",
        valor: 0,
        quant: 0,
        index: 0
      },
      total: 0,
      model: {
        dataHoraOrcamento: "",
        dataValidade: "",
        servicos: [],
        pagamentos: {
          dinheiro: false,
          debito: false,
          credito: false
        }
      },
      pickerOptions1: {
        shortcuts: [
          {
            text: "Hoje",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Ontem",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "Semana Anterior",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "Semana Depois",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
   directives: {money: VMoney},
  created() {
    dataHoraOrcamento.toLocaleDateString()
  },
  methods: {
    apagarOrcamento(row) {
      this.model.servicos = JSON.parse(
        JSON.stringify(this.model.servicos.filter(f => f.index != row.index))
      );

      this.total = 0;
      this.model.servicos.forEach(el => {
        this.total += el.valor * el.quant;
      });
    },
    pushOrcamento(evt) {
      evt.preventDefault();
      this.obj.index = this.model.servicos.length + 1;
      this.model.servicos.push(JSON.parse(JSON.stringify(this.obj)));
      this.total += this.obj.valor * this.obj.quant;
      this.obj.servico = "";
      this.obj.valor = 0;
      this.obj.quant = 0;
      this.obj.index = 0;
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res, this.model);
        return res;
      });
    }
  },
  getSummaries(param) {
    const { columns } = param;
    const sums = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = "Total";
      } else if (index < columns.length - 1) {
        sums[index] = "";
      } else {
        let sum = 0;
        this.productsTable.forEach(obj => {
          sum += obj.quantity * obj.price;
        });
        sums[index] = `€ ${sum}`;
      }
    });
    return sums;
  }
};
</script>
<style>
</style>
