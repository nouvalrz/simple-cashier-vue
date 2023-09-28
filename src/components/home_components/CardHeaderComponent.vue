<script>
export default {
  name: "CardHeaderComponent",
  data() {
    return {
      interval: null,
      time: null,
      date: null
    }
  },
  computed:{
    cardBackgroundColor(){
      if(this.$route.path === '/cashier'){
        return 'text-bg-success'
      }
      if(this.$route.path === '/history'){
        return 'text-bg-primary'
      }
      return 'text-bg-success'
    }
  },
  methods:{
    goToCashier(){
      this.$router.push('/cashier')
    },
    goToHistory(){
      this.$router.push('/history')
    }
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000)
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    switch(month) {
      case 0: month = "Januari"; break;
      case 1: month = "Februari"; break;
      case 2: month = "Maret"; break;
      case 3: month = "April"; break;
      case 4: month = "Mei"; break;
      case 5: month = "Juni"; break;
      case 6: month = "Juli"; break;
      case 7: month = "Agustus"; break;
      case 8: month = "September"; break;
      case 9: month = "Oktober"; break;
      case 10: month = "November"; break;
      case 11: month = "Desember"; break;
    }

    this.date = `${day} ${month} ${year}`;
  }
}
</script>

<template>
  <div class="card my-3" :class="cardBackgroundColor">
    <div class="card-header">{{date}} - {{time ?? '...'}}</div>
    <div class="card-body">
      <h2 class="card-title lora">Kasir Niluh</h2>
      <p class="card-text">Hitung yang bener yaaa, jangan sampai salah!</p>
      <div class="d-flex justify-content-center">
        <div class="btn-group w-75" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio-cashier" autocomplete="off" :checked="this.$route.path === '/cashier'">
          <label class="btn btn-outline-light" for="btnradio-cashier" @click="this.goToCashier()">Kasir</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio-history" autocomplete="off" :checked="this.$route.path === '/history'">
          <label class="btn btn-outline-light" for="btnradio-history" @click="this.goToHistory()">History</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card{
  transition: 0.5s;
}
</style>
