<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Date(GWT)</md-table-head>
        <md-table-head>Currency</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Volatility</md-table-head>
        <md-table-head>isClose</md-table-head>
        <md-table-head>isDelete</md-table-head>
      </md-table-row>
      <md-table-row v-for="vipData in vipDataList">
        <md-table-cell>
          <md-button class="md-icon-button" @click="onShowDialog(vipData)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell>{{vipData.Date}}</md-table-cell>
        <md-table-cell>{{vipData.Currency}}</md-table-cell>
        <md-table-cell>{{vipData.Title}}</md-table-cell>
        <md-table-cell>{{vipData.Volatility}}</md-table-cell>
        <md-table-cell>{{vipData.isClose}}</md-table-cell>
        <md-table-cell>{{vipData.isDelete}}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Vip Data Edit</md-dialog-title>
      <md-dialog-content>
        <md-table>
          <md-table-row>
            <md-table-head>Date</md-table-head>
            <md-table-cell>
              <md-field>
                <md-input v-model="dialog.date"></md-input>
              </md-field>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head>Currency</md-table-head>
            <md-table-cell>
              <md-field>
                <md-input v-model="dialog.currency"></md-input>
              </md-field>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head>Title</md-table-head>
            <md-table-cell>
              <md-field>
                <md-input v-model="dialog.title"></md-input>
              </md-field>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head md-numeric>Volatility</md-table-head>
            <md-table-cell>
              <md-field>
                <md-input v-model="dialog.volatility"></md-input>
              </md-field>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head>全注文 決済</md-table-head>
            <md-table-cell>
              <md-switch v-model="dialog.isClose"></md-switch>
            </md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head>全注文 キャンセル</md-table-head>
            <md-table-cell>
              <md-switch v-model="dialog.isDelete"></md-switch>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="onUpdate">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
    function getNowYM(date){
        const y = date.getFullYear();
        const m = ("00" + (date.getMonth()+1)).slice(-2);
        const result = y + "" + m;
        return result;
    }
  var API_URL = "http://localhost:8080"
    export default {
        name: "vipDataInfo",
        data: function () {
            return {
                vipDataList: [],
                showDialog: false,
                dialog: {
                    date: '',
                    currency: '',
                    title: '',
                    volatility: '',
                    isClose: '',
                    isDelete: '',
                    id: '',
                }
            }
        },
        methods: {
            onShowDialog: function(vipData) {
                this.dialog.date = vipData.Date;
                this.dialog.currency = vipData.Currency;
                this.dialog.title = vipData.Title;
                this.dialog.volatility = vipData.Volatility;
                this.dialog.isClose = vipData.isClose;
                this.dialog.isDelete = vipData.isDelete;
                this.dialog.id = vipData.id;
                this.showDialog = true;
            },
            onUpdate: function() {
                let params = new URLSearchParams();
                for (let key in this.dialog) {
                    params.append(key, this.dialog[key])
                }
                this.axios
                    .post(`${API_URL}/update`, params)
                    .then(response => {alert(response.data.status); this.showDialog = false;})
                    .catch(response => {console.log(response); this.showDialog = false;})
            },
        },
        created() {
            var date = getNowYM(new Date());
            this.axios
                .get(`${API_URL}/search?date=${date}`)
                .then(response => {
                    this.vipDataList = response.data.vips.map((value) => {
                        value.Date = value.Date.replace('T', ' ').replace('Z', '')
                        return value
                    })
                })
                .catch(response => {this.vipDataList = []; alert(response)})
        },
    };
</script>