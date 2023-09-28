<script>
import CardHeaderComponent from "@/components/home_components/CardHeaderComponent.vue";

export default {
  name: "HomeView",
  components:{
    CardHeaderComponent
  }
}

</script>

<template>
<div class="container">
  <card-header-component></card-header-component>
  <router-view></router-view>
</div>
</template>

<style scoped>

</style>
