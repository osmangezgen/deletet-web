<template>
  <modal
    @switchLeftModal="switchLeft"
    @switchrRightModal="switchrRight"
    :switchStatus="switchStatus"
  ></modal>
  <div class="container">
    <div class="row">
      <div class="col-10"></div>
      <div class="col-2 social">
        <a href=""><i class="fab fa-facebook-f"></i></a>
        <a href=""><i class="fab fa-twitter"></i></a>
        <a href=""><i class="fas fa-envelope"></i></a>
        <a href=""><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="header sticky-top">
    <div class="navbar-back">
      <nav class="navbar navbar-expand-lg container">
        <div class="container-fluid">
          <router-link :to="{ name: 'home' }" href=""
            ><img
              src="YOUR API URL/images/vizyonergencLogo.png"
              alt="deleTeT"
              height="40"
          /></router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">&#9776;</span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'home' }">Anasayfa</router-link>
              </li>
              <li class="nav-item">
                <a href="#">Blog</a>
              </li>
              <li class="nav-item">
                <a href="#">İlanlar</a>
              </li>
              <li class="nav-item">
                <a href="#">Başvurularım</a>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'forum' }">Forum</router-link>
              </li>
            </ul>
            <div class="login" v-if="_isAuthenticated == false">
              <a
                href=""
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="switchLeft"
                >Giriş Yap</a
              >
              <a
                href=""
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="switchrRight"
                >Kayıt Ol</a
              >
            </div>
            <div class="loginActive" v-else>
              <div class="dropdown">
                <span>
                  <span v-if="_getCurrentProfil.imageUrl != null">
                    <img
                      class="me-2"
                      :src="_getCurrentProfil.imageUrl"
                      alt=""
                      height="35"
                      width="35"
                    />
                  </span>
                  <span v-else>
                    <img
                      class="me-2"
                      src="YOUR API URL/images/user.png"
                      alt=""
                      height="35"
                    />
                  </span>
                </span>
                <a
                  class="btn btn-secondary dropdown-toggle loginActiveName"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ _getCurrentProfil.fullName }}
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <router-link :to="{ name: 'profile' }" class="dropdown-item"
                      >Profil</router-link
                    >
                  </li>
                  <li class="logout">
                    <a class="dropdown-item" href="#" @click="onLogout"
                      >Çıkış Yap <span><i class="fas fa-sign-out-alt"></i></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import Modal from "../Login-Register/LoginRegisterModal.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_isAuthenticated", "_getCurrentProfil"]),
  },
  components: {
    Modal,
  },
  data() {
    return {
      switchStatus: {
        switchLeft: null,
        switchrRight: null,
        status: null,
      },
    };
  },
  methods: {
    switchLeft() {
      this.switchStatus.switchrRight = null;
      this.switchStatus.switchLeft = "background: #457B9D";
      this.switchStatus.status = true;
    },
    switchrRight() {
      this.switchStatus.switchLeft = null;
      this.switchStatus.switchrRight = "background: #457B9D";
      this.switchStatus.status = false;
    },
    onLogout() {
      this.$store.commit("logoutUser");
      this.$router.push({ name: "home" });
    },
    test() {
      this.$refs.login.click();
    },
  },
  watch: {
    notLogin() {
      this.$refs?.login.click();
    },
  },
};
</script>
<style scoped>
.loginActiveName {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}
.dropdown {
  transition: 0.3s all;
}
.logout span {
  margin-left: 5px !important;
  color: black;
  float: right;
}
.dropdown img {
  border-radius: 50%;
  user-select: none;
  border: 2px solid white;
}
.navbar-toggler:focus {
  box-shadow: none;
}
.navbar .dropdown-menu li a {
  color: black !important;
  margin: 0;
}
.navbar .dropdown-menu {
  width: 100%;
}
.navbar .dropdown-menu li a:hover {
  background: #e5e7e9;
}
.navbar .dropdown a {
  border: none;
  background: none;
}
.navbar .dropdown a:active {
  border: none !important;
  background: none !important;
}
.navbar .dropdown a:focus {
  box-shadow: none;
}
</style>
