<style>
img {
  margin: 20px;
  width: 200%;
}
hr {
  border-width: 2px;
  border-color: #000000;
}
#hr {
  border-width: 2px;
  border-color: #000000;
  padding: 0%;
  margin: 0%;
}
.title {
  font-weight: bold;
  font-weight: 1000% !important;
  font-size: 110%;
}
.dqvt {
  margin: 0px !important ;
}
.borda {
  padding-left: 40px;
}
#tx {
  padding-top: 10px;
}
</style>
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <img src="/static/img/logo/logo_nota.png" alt />
        </div>
        <div class="col-5"></div>
        <div class="col-4" style="margin: 15px;">
          <h6>Best Work Estética Automotiva</h6>
          <p>
            Estrada do cafundá, 915. Taquara - RJ - 22730-540
            <br />CNPJ:36.77.079/001-09
            <br />bestworkrj@gmail.com
            <br />Whatsapp: (21) 964095163
            <br />Facebook/Instagram:@Bestworkrj
          </p>
        </div>
      </div>
      <div class="col-12">
        <hr />
      </div>
      <div class="row align-items-center">
        <div class="col-2 borda">
          <p class="title dqvt">
            Cliente
            <br />
          </p>
          <p class="title dqvt">
            {{dados.cliente.nome}}
            <br />
          </p>
          <p>
            {{dados.cliente.telefone}}
            <br />
            {{dados.cliente.email}}
          </p>
        </div>
        <div class="col-5"></div>
        <div class="col-4" style="margin: 15px;">
          <p class="title dqvt">Recibo N°: {{dados.idOrcamento}}</p>
          <p>Data: {{dados.data_de_orcamento.toLocaleString()}}</p>
          <p>Data de validade: {{dados.data_de_validade.toLocaleDateString()}}</p>
        </div>
      </div>
      <div class="col-12">
        <hr />
      </div>
      <div class="row align-items-center">
        <div class="col-6 borda">
          <p class="title dqvt">Descrição</p>
        </div>
        <div class="col-2">
          <p class="title dqvt text-center">Quantidade</p>
        </div>
        <div class="col-2">
          <p class="title dqvt text-center">Vlr.Unitário</p>
        </div>
        <div class="col-2">
          <p class="title dqvt text-center">Total</p>
        </div>
      </div>
      <div class="col-12">
        <hr />
      </div>
      <div v-for="(serv,index) in dados.servicos" :key="index" class="row align-items-center">
        <div class="col-6 borda">
          <p class>{{serv.servico}}</p>
        </div>
        <div class="col-2">
          <p class="text-center">{{serv.quant}}</p>
        </div>
        <div class="col-2">
          <p class="text-center">R$ {{Number(serv.valor).toFixed(2)}}</p>
        </div>
        <div class="col-2">
          <p class="text-center">R$ {{Number(serv.quant * serv.valor).toFixed(2)}}</p>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-6 borda">
          <p class="title dqvt">Dados de Pagamento</p>
          <p v-if="dados.pagamentos.credito == true">Cartão de crédito</p>
          <p v-if="dados.pagamentos.debito == true">Cartão de débito</p>
          <p v-if="dados.pagamentos.dinheiro == true">Dinheiro</p>
        </div>
        <div class="row col-6">
          <div class="col-6"></div>
          <div class="col-3 align-self-end">
            <p class="title text-right">SubTotal</p>
          </div>
          <div class="col-3 align-self-end">
            <p class="title text-right">R$ {{total.toFixed(2)}}</p>
          </div>
        </div>
        <div class="col-6"></div>
        <div class="col-6">
          <hr id="hr" />
        </div>
        <div class="col-6"></div>
        <div class="col-6 row">
          <div></div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-2"></div>
      <div class="col-6">
        <h6>Best Work Estética Automotiva</h6>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dados: {
        cliente: { nome: "", telfone: "", email: "" },
        servicos: [],
        pagamentos: {
          credito: false,
          debito: false,
          dinheiro: false
        }
      },
      total: 0
    };
  },
  created() {
    //console.log("Dados...");
    this.dados = JSON.parse(localStorage.getItem("orcamento"));
    console.log(this.dados);

    //localStorage.removeItem("orcamento");
    this.dados.servicos.forEach(element => {
      this.total += element.valor * element.quant;
    });
    console.log(this.total);
    this.dados.data_de_orcamento = new Date(this.dados.data_de_orcamento);
    this.dados.data_de_validade = new Date(this.dados.data_de_validade);
  }
};
</script>