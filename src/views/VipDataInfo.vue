<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Date</md-table-head>
        <md-table-head>Currency</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Volatility</md-table-head>
        <md-table-head>isClose</md-table-head>
        <md-table-head>isDelete</md-table-head>
      </md-table-row>
      <md-table-row v-for="vipData in vipDataList">
        <md-table-cell>{{vipData.Date}}</md-table-cell>
        <md-table-cell>{{vipData.Currency}}</md-table-cell>
        <md-table-cell>{{vipData.Title}}</md-table-cell>
        <md-table-cell>{{vipData.Volatility}}</md-table-cell>
        <md-table-cell>{{vipData.isClose}}</md-table-cell>
        <md-table-cell>{{vipData.isDelete}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
    export default {
        name: "vipDataInfo",
        data: function () {
            return {
                vipDataList: []
            }
        },
        created() {
            this.axios
                .get(`http://localhost:8080/search?date=201903`)
                .then(response => {
                    this.vipDataList = response.data.vips
                })
                .catch(response => {this.vipDataList = []; alert(response)})
        },
    };
</script>