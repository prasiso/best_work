<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Lista de Orçamento</div>
      </div>
      <div class="card-body row">
        <div class="col-sm-6">
          <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <fg-input
              class="input-sm"
              placeholder="Pesquisar orçamento"
              v-model="searchQuery"
              addon-right-icon="nc-icon nc-zoom-split"
            ></fg-input>
          </div>
        </div>
        <div class="col-sm-12 mt-2">
          <el-table class="table-striped" :data="queriedData" border style="width: 100%">
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            ></el-table-column>
            <el-table-column :min-width="120" fixed="right" class-name="td-actions" label="Actions">
              <template slot-scope="props">
                <p-button type="info" size="sm" icon @click="handleLike(props.$index, props.row)">
                  <i class="fa fa-user"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Mostrando {{from + 1}} a {{to}} de {{total}} entrada</p>
        </div>
        <div class="col-sm-6">
          <p-pagination
            class="pull-right"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="pagination.total"
          ></p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import relatorioVue from "../Forms/Wizard/relatorio.vue";
import users from "./users";
import axios from "axios";
import { wizardComplete } from "src/components/Dashboard/Views/Forms/Wizard.vue";
import dados from "src/components/Dashboard/Views/Forms/Wizard/relatorio.vue";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    PPagination
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.dados) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tableData.length;
      return this.tableData.length;
    }
  },
  data() {
    return {
      dados: {
        cliente: { nome: "", email: "" }
      },
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchQuery: "",
      dados: ["idOrcamento", "nome", "email"],
      tableColumns: [
        {
          prop: "idOrcamento",
          label: "ID",
          minWidth: 60
        },
        {
          prop: "cliente.nome",
          label: "nome",
          minWidth: 250
        },
        {
          prop: "cliente.email",
          label: "Email",
          minWidth: 250
        },
        {
          prop: "orcamento.data_de_orcamento",
          label: "D.Orçamento",
          minWidth: 250
        },
        {
          prop: "orcamento.data_de_validade",
          label: "D.Validade",
          minWidth: 250
        },
      ],
      tableData: users
    };
  },
  methods: {
    handleLike(index, row) {
      axios.get(`http://localhost:3000/orc/${row.idOrcamento  }`).then(r => {
        let dado = r.data;
        dado["pagamentos"] = {
          debito: dado.debito,
          credito: dado.credito,
          dinheiro: dado.dinheiro
        };
        dado.dataOrcamento = new Date(dado.dataOrcamento);
        dado.dataValidade = new Date(dado.dataValidade);
        dado["data_de_orcamento"] = new Date(dado.dataOrcamento);
        dado["data_de_validade"] = new Date(dado.dataValidade);
        localStorage.setItem("orcamento", JSON.stringify(dado));
        this.$router.push({
          name: "relatorio"
        });
      });
    }
  },
  created() {
    axios.get("http://localhost:3000/orc/").then(r => {
      this.tableData = r.data;
    });

    this.dados = JSON.parse(localStorage.getItem("orcamento"));
    console.log(this.dados);
  }
};
</script>
<style lang="scss">
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}
</style>
