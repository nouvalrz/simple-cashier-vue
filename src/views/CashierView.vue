<script>
import {mapGetters, mapActions} from "vuex";
import { Modal } from 'bootstrap'

export default {
  name: "CashierView",
  computed: {
    ...mapGetters('invoiceStore', {
      items: "getItems",
      itemsLength: "getItemsLength",
      billSummary: "getBillSummary",
      pay: "getPay",
      isValid: "getIsValid",
      invoiceNumber: "getInvoiceNumber"
    }),
    isItemEmpty() {
      return this.itemsLength === 0
    },
  },
  methods: {
    ...mapActions('invoiceStore', {
      addItem: 'addItem',
      removeItem: 'removeItem',
      calculateSubtotalPrice: 'calculateSubtotalPrice',
      calculateTotalPrice: 'calculateTotalPrice',
      calculateTotalItem: 'calculateTotalItem',
      calculateChange: 'calculateChange',
      validateInvoice: 'validateInvoice',
      createInvoice: 'createInvoice'
    }),
    async saveInvoice() {
      this.validateInvoice()
      if (this.isValid) {
        try {
          this.isLoading = true
          await this.createInvoice()
          this.isLoading = false
          this.$toast.open({
            message: "Berhasil Menambah Data",
            type: "success",
          });
          this.confirmationModal.hide()
          this.successModal.show()
        } catch (e) {
          this.$toast.open({
            message: `Error = ${e.response.data}`,
            type: "error",
          });
        }
      }
    },
    showModal() {
      this.validateInvoice()
      if(this.isValid){
        this.confirmationModal.show()
      }else{
        this.$toast.open({
          message: "Uang pembeli tidak cukup, atau ada data yang kurang!",
          type: "error",
        });
      }
    },
    hideModal() {
      this.confirmationModal.hide()
    }
  },
  data() {
    return {
      isLoading: false,
      modalVisible: false,
      confirmationModal: null,
      successModal: null
    }
  },
  watch: {
    items: {
      handler() {
        this.calculateSubtotalPrice()
        this.calculateTotalPrice()
        this.calculateTotalItem()
        this.calculateChange()
      },
      deep: true
    },
    pay: {
      handler() {
        this.calculateChange()
      },
      deep: true
    }
  },
  mounted() {
    this.confirmationModal = new Modal(document.getElementById('confirmationModal'), {})
    this.successModal = new Modal(document.getElementById('successModal'), {})
  }
}
</script>

<template>
  <div>

    <div class="d-flex justify-content-between align-items-center my-2">
      <h3>Fitur Kasir</h3>
      <div>
        <button type="button" class="btn btn-success" @click="this.addItem()">Tambah Item</button>
      </div>
    </div>
    <div class="card p-4">
      <form @submit.prevent="showModal">
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
              <th scope="row">{{ index + 1 }}</th>
              <td><textarea class="form-control" type="text" rows="1" v-model="item.item_name"
                            placeholder="Masukkan nama" required></textarea></td>
              <td>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input class="form-control" type="number" placeholder="0" v-model="item.item_price" required>
                  <!--              <money v-model="item.unitPrice" v-bind="money"></money>-->
                </div>
              </td>
              <td><input class="form-control" type="number" v-model="item.item_quantity" placeholder="0" required></td>
              <td>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input class="form-control" type="number" readonly :value="item.item_subtotal" placeholder="0"
                         required>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-outline-danger" @click="this.removeItem(index)">X</button>
              </td>
            </tr>

            <tr v-if="isItemEmpty">
              <td colspan="6" class="text-center">
                <h6>Item masih kosong</h6>
              </td>
            </tr>

            <tr>
              <td colspan="3">
                <div class="d-flex justify-content-end">
                  <b class="text-end">Total Harga</b>
                </div>
              </td>
              <td class="text-center"><b>{{ billSummary.total_item }} Barang</b></td>
              <td colspan="2">
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input class="form-control" type="number" v-model="this.billSummary.total_price" placeholder="0"
                         disabled>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <div class="d-flex justify-content-end">
                  <b class="text-end">Bayar</b>
                </div>
              </td>
              <td></td>
              <td colspan="2">
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input class="form-control" type="number" v-model="this.billSummary.pay" placeholder="0" required>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <div class="d-flex justify-content-end">
                  <b class="text-end">Kembalian</b>
                </div>
              </td>
              <td></td>
              <td colspan="2">
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input class="form-control" type="text"
                         :value="this.billSummary.change < 0 ? 'Gak Cukup' : this.billSummary.change" placeholder="0"
                         disabled>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer d-flex justify-content-center">
          <input type="submit" value="Simpan dan Cetak" class="btn btn-primary">
        </div>
      </form>
    </div>

<!--    MODAL    -->
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Apakah Data Sudah Benar? Pastikan Lagi!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Produk</th>
                <th scope="col">Harga Satuan</th>
                <th scope="col">Kuantitas</th>
                <th scope="col">Subtotal</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>{{ item.item_name }}</td>
                <td>{{ item.item_price }}</td>
                <td>{{ item.item_quantity }}</td>
                <td>{{ item.item_subtotal }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-end">Total Harga</td>
                <td><b>{{billSummary.total_price}}</b></td>
              </tr>
              <tr>
                <td colspan="4" class="text-end">Bayar</td>
                <td><b>{{billSummary.pay}}</b></td>
              </tr>
              <tr>
                <td colspan="4" class="text-end">Kembalian</td>
                <td><b>{{billSummary.change}}</b></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="saveInvoice()">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-if="isLoading" class="visually-hidden">Memuat...</span>
              <span v-else>Simpan dan Cetak</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--    MODAL    -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Berhasil </h5>
          </div>
          <div class="modal-body">
            <h5>Nomor Invoice : {{invoiceNumber}}</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Selesai</button>
            <a :href="'bprint://https://kasir.nouvalrz.site/api/invoice/print/' + invoiceNumber" class="btn btn-primary">CETAK</a>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>
