<template>
  <div>
    {{ vipDataList }}
  </div>
</template>

<script>
    export default {
        name: "vipDataInfo",
        computed: {
            vipDataList: function() {
                this.axios
                    .get(`http://localhost:8080/search?date=201903`)
                    .then(response => {console.log(response)})
                    .catch(response => {console.log(response)})
            }
        }
    };
</script>