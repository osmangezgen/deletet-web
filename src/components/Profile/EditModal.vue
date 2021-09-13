<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="editmodal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"><b>Düzenle</b></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- identity -->
          <div v-if="userData[1]?.status == 'identity'">
            <h3>Ad-Soyad</h3>
            <input
              class="form-control mt-2"
              type="text"
              v-model="userEditData.fullName"
            />
            <h3 class="mt-4">Email</h3>
            <input
              class="form-control mt-2"
              type="text"
              v-model="userEditData.email"
              readonly
            />
            <h3 class="mt-4">T.C Numarası</h3>
            <input class="form-control mt-2" type="text" v-model="userEditData.tckn" />
          </div>
          <!-- university -->
          <div v-if="userData[1]?.status == 'university'">
            <h3>Üniversite</h3>
            <input
              class="form-control mt-2"
              type="text"
              v-model="userEditData.university"
            />
          </div>
          <!-- other -->
          <div v-if="userData[1]?.status == 'other'">
            <h3>Adres</h3>
            <input class="form-control mt-2" type="text" v-model="userEditData.address" />
            <h3 class="mt-4">Telefon</h3>
            <input
              class="form-control mt-2"
              type="text"
              v-model="userEditData.phoneNumber"
            />
            <h3 class="mt-4">Website</h3>
            <input class="form-control mt-2" type="text" v-model="userEditData.website" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            ref="close"
          >
            Kapat
          </button>
          <button type="button" class="btn btn-primary" @click="saveData">
            Değişikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userData"],
  data() {
    return {
      userEditData: {
        fullName: null,
        email: null,
        tckn: null,
        university: null,
        address: null,
        phoneNumber: null,
        website: null,
      },
    };
  },
  methods: {
    saveData() {
      this.$appAxios
        .put("deletet/profile/update/" + this.userData[0].userId, this.userEditData)
        .then(() => {
          this.$emit("onSaved");
          this.$refs.close.click();
        });
    },
  },
  created() {
    this.userEditData.fullName = this.userData[0].fullName;
    this.userEditData.email = this.userData[0].email;
    this.userEditData.tckn = this.userData[0].tckn;
    this.userEditData.university = this.userData[0].university;
    this.userEditData.address = this.userData[0].address;
    this.userEditData.phoneNumber = this.userData[0].phoneNumber;
    this.userEditData.website = this.userData[0].website;
  },
};
</script>

<style scoped>
h3 {
  font-weight: bold;
  color: #454545;
}
</style>
