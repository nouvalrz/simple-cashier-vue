<script>
import {uuid} from "vue-uuid";
// import { useCollection, } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import {db} from "@/services/firebase";

export default {
  name: "CashierView",
  computed:{
    isItemEmpty(){
      return this.items.length === 0
    }
  },
  data(){
    return{
      items : [
        {
          id: uuid.v1(),
          productName: "",
          unitPrice: null,
          quantity: null,
          subtotalPrice: null
        }
      ],
      billSummary: {
        totalPrice: 0,
        totalQuantity:0
      },
    }
  },
  methods:{
    addNewItem(){
      this.items.push({
        id: uuid.v1(),
        productName: "",
        unitPrice: null,
        quantity: null,
        subtotalPrice: null
      })
      console.log(this.items)
    },
    deleteItem(index){
      this.items.splice(index, 1)
    },
    async createInvoice(){
      await addDoc(collection(db, 'invoices'), {...this.$data, created_at: new Date().toLocaleString()})
    }
  },
  watch:{
      items:{
        handler(){
          this.items.map((item)=>{
            item.subtotalPrice = item.unitPrice * item.quantity
          })
          this.billSummary.totalPrice = this.items.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.subtotalPrice
          },0);
          this.billSummary.totalQuantity = this.items.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity
          },0);
        },
        deep: true
      }
  },
}
</script>

<template>
  <h3 class="mt-5">Fitur Kasir</h3>
  <div class="card p-4">
    <div class="table-responsive">
      <table class="table table-secondary">
        <thead>
        <tr>
          <th scope="col" class="col-1" style="width: 3%;">#</th>
          <th scope="col" class="col-4">Nama Produk</th>
          <th scope="col" class="col-3">Harga Satuan</th>
          <th scope="col" class="col-1">Kuantitas</th>
          <th scope="col" class="col-3">Subtotal</th>
          <th scope="col" class="col-1" style="width: 3%;">Aksi</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, index) in items" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td><textarea class="form-control" type="text" rows="1" v-model="item.productName" placeholder="Masukkan nama"></textarea></td>
          <td>
            <div class="input-group">
              <span class="input-group-text">Rp</span>
              <input class="form-control"  placeholder="0" v-model="item.unitPrice">
<!--              <money v-model="item.unitPrice" v-bind="money"></money>-->
            </div>
          </td>
          <td><input class="form-control" type="number" v-model="item.quantity" placeholder="0"></td>
          <td>
            <div class="input-group">
              <span class="input-group-text">Rp</span>
              <input class="form-control" type="number" readonly :value="item.subtotalPrice" placeholder="0">
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger" @click="deleteItem(index)">X</button>
          </td>
        </tr>

        <tr>
          <td colspan="6">
            <div class="d-flex flex-column"  :class="{'align-items-end': !isItemEmpty, 'align-items-center': isItemEmpty}">
              <h6 v-if="isItemEmpty">Item masih kosong</h6>
              <button type="button" class="btn btn-success" @click="addNewItem()">Tambah Item</button>
            </div>
          </td>
        </tr>

        <tr>
          <td colspan="3">
            <div class="d-flex justify-content-end">
              <b class="text-end">Total</b>
            </div>
          </td>
          <td><b>{{billSummary.totalQuantity}} Item</b></td>
          <td colspan="2"><b>Rp. {{ billSummary.totalPrice }}</b></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer d-flex justify-content-center">
      <button type="button" class="btn btn-primary" @click="createInvoice()">Simpan & Cetak</button>
    </div>
  </div>
</template>

<style scoped>

</style>
