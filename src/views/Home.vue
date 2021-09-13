<template>
  <div class="content container mt-4">
    <div class="row">
      <profil-sidebar v-if="_isAuthenticated == true"></profil-sidebar>
      <not-authenticated v-if="_isAuthenticated == false"></not-authenticated>
      <div class="col-md-6 mt-4 mb-4 news-align">
        <div class="card" v-for="item in homepageData" :key="item.id">
          <div class="card-body">
            <div class="news-head">
              <img :src="item.companyIconUrl" alt="" height="50" width="66" />
              <span class="ms-2">{{ item.companyName }}</span>
            </div>
            <p>
              {{ item.newsDescription }}
              <a class="float-end m-1" href="">Devamını Oku...</a>
            </p>
            <img
              class="news-main-img"
              :src="item.newsImage"
              alt=""
              height="315"
              width="512"
            />
            <div class="interaction mt-2">
              <div class="news-tag">
                <span>{{ item.newsTag }}&nbsp;</span>
              </div>
              <div class="news-icon">
                <i class="far fa-heart me-2"></i>
                <i class="far fa-comments"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <right-sidebar></right-sidebar>
    </div>
  </div>
</template>

<script>
import ProfilSidebar from "../components/Home/ProfilSidebar.vue";
import RightSidebar from "../components/Home/RightSidebar.vue";
import notAuthenticated from "../components/Home/notAuthenticated.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_isAuthenticated"]),
  },
  components: {
    ProfilSidebar,
    RightSidebar,
    notAuthenticated,
  },
  data() {
    return {
      homepageData: null,
      veri: {
        email: "test2@gmail.com",
        password: "123",
      },
    };
  },
  created() {
    this.$appAxios.get("deletet/homepage").then((x) => {
      this.homepageData = x.data;
    });
  },
};
</script>

<style></style>
