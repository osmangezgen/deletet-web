<template>
  <div class="content container mt-4">
    <div class="row">
      <profil-sidebar :profilePointUpdate="profilePointUpdate"></profil-sidebar>
      <edit-modal :userData="userData" @onSaved="onSaved"></edit-modal>
      <div class="col-md-6 mt-4 mb-4 news-align">
        <div class="profile-info">
          <div class="info-block">
            <h3 class="card">
              Kimlik Bilgileri
              <span
                @click="edit('identity')"
                data-bs-toggle="modal"
                data-bs-target="#editmodal"
                ><i class="fas fa-edit"></i
              ></span>
            </h3>
            <div>
              <div class="row">
                <div class="col-md-6">
                  <h4>Ad Soyad:</h4>
                  <span>{{ userData[0]?.fullName }}</span>
                </div>
                <div class="col-md-6">
                  <h4>T.C. Numarası:</h4>
                  <span v-if="userData[0]?.tckn != null"
                    >{{ userData[0]?.tckn.substring(0, 3) }}********</span
                  >
                  <span v-else>-</span>
                </div>
              </div>
              <h4>Email:</h4>
              <span>{{ userData[0]?.email }}</span>
            </div>
          </div>
          <div class="info-block mt-5">
            <h3 class="card">
              Eğitim Bilgileri
              <span
                @click="edit('university')"
                data-bs-toggle="modal"
                data-bs-target="#editmodal"
                ><i class="fas fa-edit"></i
              ></span>
            </h3>
            <div>
              <div class="education">
                <div>
                  <h5>
                    <i class="fas fa-university"></i>
                    <div>
                      <p v-if="userData[0]?.university != ''">
                        {{ userData[0]?.university }}
                      </p>
                      <p v-else>-</p>
                      <!-- <span class="departman" v-if="userData[0]?.university != ''"
                        >Lisans - Bilgisayar Mühendisliği</span
                      > -->
                    </div>
                  </h5>
                  <span class="date" v-if="userData[0]?.university != ''">Eki 2020</span>
                </div>
                <!-- -->
                <!-- <div style="margin-top: 25px">
                  <h5>
                    <i class="fas fa-university"></i>
                    <div>
                      <p>Kırıkkale Üniversitesi</p>
                      <span class="departman">Ön Lisans - Bilgisayar Programcılığı</span>
                    </div>
                  </h5>
                  <span class="date">Ağu 2018 - Tem 2020</span>
                </div> -->
              </div>
            </div>
          </div>
          <div class="info-block mt-5">
            <h3 class="card">
              Diğer Bilgiler
              <span
                @click="edit('other')"
                data-bs-toggle="modal"
                data-bs-target="#editmodal"
                ><i class="fas fa-edit"></i
              ></span>
            </h3>
            <div>
              <div class="other">
                <div>
                  <h5>Adres:</h5>
                  <span v-if="userData[0]?.address != null">{{
                    userData[0]?.address
                  }}</span>
                  <span v-else>-</span>
                </div>
                <div>
                  <h5>Telefon:</h5>
                  <span v-if="userData[0]?.phoneNumber != null">{{
                    userData[0]?.phoneNumber
                  }}</span>
                  <span v-else>-</span>
                </div>
                <div>
                  <h5>Website:</h5>
                  <span v-if="userData[0]?.website != null">{{
                    userData[0]?.website
                  }}</span>
                  <span v-else>-</span>
                </div>
                <div>
                  <h5>Sosyal Medya:</h5>
                  <div class="social-media">
                    <span
                      ><i class="fab fa-twitter me-2"></i
                      >{{ userData[0]?.fullName.replace(" ", "").toLowerCase() }}</span
                    >
                    <span
                      ><i class="fab fa-instagram-square me-2"></i
                      >{{ userData[0]?.fullName.replace(" ", "").toLowerCase() }}</span
                    >
                    <span
                      ><i class="fab fa-linkedin me-2"></i
                      >{{ userData[0]?.fullName.replace(" ", "").toLowerCase() }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-4 sidebar-align">
        <div class="links-list">
          <div class="links">
            <h3 class="card">
              <div>
                <span>Forum Puanı</span>
                <span>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 75%"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      75 Puan
                    </div>
                  </div>
                </span>
              </div>
            </h3>
          </div>
          <div class="links mt-3">
            <h3 class="card">
              <div>
                <span>Sorular</span>
                <span>{{ questionCount.length }}</span>
              </div>
            </h3>
          </div>
          <div class="links mt-3">
            <h3 class="card">
              <div>
                <span>Cevaplar</span>
                <span>{{ answerCount.length }}</span>
              </div>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfilSidebar from "../components/Home/ProfilSidebar.vue";
import EditModal from "../components/Profile/EditModal.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
  components: {
    ProfilSidebar,
    EditModal,
  },
  data() {
    return {
      userData: {},
      questionRead: {},
      questionCount: [],
      answerRead: {},
      answerCount: [],
      profilePointUpdate: false,
    };
  },
  methods: {
    edit(value) {
      if (this.userData.length > 1) this.userData.pop();
      this.userData.push({
        status: value,
      });
    },
    getUserData() {
      this.$appAxios.get("deletet/profile/" + this._getCurrentUser.id).then((x) => {
        this.userData = x.data;
      });
    },
    onSaved() {
      this.getUserData();
      this.profilePointUpdate = true;
    },
    questionReadValue() {
      this.$appAxios.get("deletet/forum/readAll").then((x) => {
        this.questionRead = x.data;
        this.questionCountValue();
      });
    },
    questionCountValue() {
      this.questionRead.forEach((x) => {
        if (x.fullname == this._getCurrentUser.fullName) {
          this.questionCount.push(x);
        }
      });
      console.log(this.questionCount);
    },
    answerReadValue() {
      this.$appAxios.get("deletet/answer/readAll").then((x) => {
        this.answerRead = x.data;
        this.answerCountValue();
      });
    },
    answerCountValue() {
      this.answerRead.forEach((x) => {
        if (x.userid == this._getCurrentUser.id) {
          this.answerCount.push(x);
        }
      });
    },
  },
  created() {
    this.getUserData();
    this.questionReadValue();
    this.answerReadValue();
  },
  watch: {
    profilePointUpdate() {
      setTimeout(() => {
        this.profilePointUpdate = false;
      }, 1500);
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: none;
  display: block;
}
.fa-linkedin {
  color: #2867b2;
}
.fa-instagram-square {
  color: #c13584;
}
.fa-twitter {
  color: #1da1f2;
}
.links-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0.7;
  color: #457b9d;
}
.progress-bar {
  color: white;
  background: #457b9d;
}
</style>
