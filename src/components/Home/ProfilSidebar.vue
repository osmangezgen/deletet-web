<template>
  <div class="col-md-3 mt-4">
    <!-- Modal -->
    <div
      class="modal fade"
      id="editmodalImg"
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
            <h3>Fotğraf Url</h3>
            <input class="form-control mt-2" type="text" v-model="userData.imageUrl" />
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
            <button type="button" class="btn btn-primary" @click="saveDataImg">
              Değişikleri Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="profil">
      <div
        class="profil-edit"
        data-bs-toggle="modal"
        data-bs-target="#editmodalImg"
        v-if="$route.name == 'profile'"
      >
        <i class="fas fa-edit"></i>
      </div>
      <span v-if="_getCurrentProfil.imageUrl != null"
        ><img :src="_getCurrentProfil.imageUrl" alt="" height="150" width="150"
      /></span>
      <span v-else><img src="images/user.png" alt="" height="150" /></span>
      <h1>{{ _getCurrentProfil.fullName }}</h1>
      <div class="profile-point">
        <span class="me-2">{{ point }}</span>
        <small v-for="index in starFull" :key="index"><i class="fas fa-star"></i></small>
        <small v-for="index in starHalf" :key="index"
          ><i class="fa fa-star-half-alt"></i
        ></small>
        <small v-for="index in starNull" :key="index"><i class="far fa-star"></i></small>
        <!-- <i class="fas fa-star"></i><i class="fas fa-star"></i> <i class="fas fa-star"></i
        ><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i> -->
      </div>
    </div>
    <div class="interest">
      <h3>İlgi Alanlarım</h3>
      <span>#eğitim</span>
      <span>#yazılım</span>
      <span>#teknoloji</span>
      <span>#ilan</span>
      <span>#uzay</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["profilePointUpdate"],
  computed: {
    ...mapGetters(["_getCurrentProfil"]),
  },
  data() {
    return {
      point: null,
      starFull: null,
      starHalf: null,
      starNull: null,
      userData: {
        imageUrl: null,
      },
      userProfileData: null,
    };
  },
  methods: {
    pointCount() {
      this.$appAxios
        .put("deletet/profile/updateProfilePoint/" + this._getCurrentProfil.userId)
        .then((x) => {
          this.point = x.data;
          this.starFull = x.data / 20;
          this.starFull = this.starFull.toString().split(".")[0];
          this.starFull = parseInt(this.starFull);

          this.starHalf = x.data % 20;
          if (this.starHalf >= 10) {
            this.starHalf = 1;
          } else this.starHalf = 0;

          this.starNull = parseInt(5 - (this.starFull + this.starHalf));
        });
    },
    saveDataImg() {
      this.$appAxios
        .put("deletet/profile/update/" + this._getCurrentProfil.userId, this.userData)
        .then(() => {
          this.$appAxios
            .get("deletet/profile/" + this._getCurrentProfil.userId)
            .then((response) => {
              this.userProfileData = response.data;
              this.$store.commit("setProfil", this.userProfileData[0]);
            });
          this.$refs.close.click();
        });
    },
  },
  created() {
    this.pointCount();
    this.userData.imageUrl = this._getCurrentProfil.imageUrl;
  },
  watch: {
    profilePointUpdate() {
      if (this.profilePointUpdate == true) this.pointCount();
    },
  },
};
</script>

<style scoped>
.profil {
  position: relative;
}
.profil-edit {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #1d3557;
}
.profil-edit:hover {
  color: black;
}
.personel-points {
  display: inline-block;
  margin: 20px;
  color: orange;
}
.personel-points .points {
  margin: 3px;
}
.profile-point {
  margin-top: 20px;
  font-family: "Poppins", sans-serif;
}
.profile-point span {
  background: #febe42;
  padding: 0 8px;
  border-radius: 5px;
  color: white;
}
.profile-point .fa-star,
.fa-star-half-alt {
  color: #febe42;
}
</style>
