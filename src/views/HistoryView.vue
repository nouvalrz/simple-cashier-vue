<script>
import { useCollection, } from 'vuefire'
import { collection, } from 'firebase/firestore'
import {db} from "@/services/firebase";
export default {
  name: "HistoryView",
  data(){
    return {
      invoices : []
    }
  },
  methods:{
    getAllInvoice(){
      this.invoices = useCollection(collection(db, 'invoices'), {
        once: true,
      })
    }
  },
  created() {
    this.getAllInvoice()
  }
}
</script>

<template>
  <h3 class="mt-5">Fitur History</h3>
  <div class="card p-4">
    <div class="table-responsive">
      <table class="table table-secondary">
        <thead>
        <tr>
          <th scope="col" class="col-1" style="width: 3%;">#</th>
          <th scope="col" class="col-2">Tanggal Struk</th>
          <th scope="col" class="col-3">Total Harga</th>
          <th scope="col" class="col-1" style="width: 3%;">Aksi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(invoice, index) in invoices" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{invoice.created_at}}</td>
          <td>{{invoice.billSummary.totalPrice}}</td>
          <td>
            <p class="d-inline-flex gap-1">
              <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Link with href
              </a>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Button with data-bs-target
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
              </div>
            </div>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>

</style>
