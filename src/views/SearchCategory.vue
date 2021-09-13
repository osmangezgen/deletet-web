<template>
  <div class="forum container mt-4">
    <div class="row">
      <nagivation-sidebar></nagivation-sidebar>
      <div class="col-md-9 mt-4 forum-content">
        <div class="forum-title">
          <span>#{{ $route.params.searchcategory }}</span>
        </div>
        <div v-if="error">
          <div class="alert alert-warning" role="alert">
            Henüz bu etikette soru sorulmadı.
          </div>
        </div>
        <div class="question-list">
          <div class="question card" v-for="item in data" :key="item.id">
            <div class="question-profil">
              <div>
                <img :src="item.imgUrl" alt="" height="40" width="40" />
                <span>{{ item.fullname }}</span>
                <small>{{ item.date.split(" ")[1] }}</small>
              </div>
              <div class="interaction-bookmark">
                <span class="bookmark"><i class="far fa-bookmark"></i></span>
                <small class="toolTips">Favorilere Ekle</small>
              </div>
            </div>
            <h1>
              <router-link :to="{ name: 'question', params: { id: item.id } }"
                >{{ item.title }}
              </router-link>
            </h1>
            <hr />
            <div class="question-interaction">
              <div class="row">
                <div class="col-md-6">
                  <div class="question-icon">
                    <div
                      @click="
                        updateLike(item.id, item.likes?.indexOf(_getCurrentUser.id))
                      "
                    >
                      <div v-if="_getCurrentUser != null">
                        <span
                          class="heart"
                          v-if="item.likes != null"
                          :likes="item.likes.includes(_getCurrentUser.id)"
                          ><i class="fas fa-thumbs-up"></i
                          ><small class="ms-1"
                            >+{{ item.likes?.split(",").length }}</small
                          ></span
                        >
                        <span class="heart" v-else
                          ><i class="fas fa-thumbs-up"></i><small></small
                        ></span>
                      </div>
                      <div v-else>
                        <span class="heart" v-if="item.likes != null"
                          ><i class="fas fa-thumbs-up"></i
                          ><small class="ms-1"
                            >+{{ item.likes?.split(",").length }}</small
                          ></span
                        >
                        <span class="heart" v-else
                          ><i class="fas fa-thumbs-up"></i><small></small
                        ></span>
                      </div>
                      <small class="toolTips">Beğen</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="question-tag">
                    <span v-for="tag in item.languages.split(',')" :key="tag"
                      >#{{ tag }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NagivationSidebar from "../components/Forum/NagivationSidebar.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_getCurrentUser", "_userLikes"]),
  },
  components: {
    NagivationSidebar,
  },
  data() {
    return {
      forumData: [],
      data: [],
      error: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$appAxios.get("deletet/forum/readAll").then((x) => {
        this.forumData = x.data;
        this.dataList();
      });
    },
    dataList() {
      this.error = null;
      this.data = [];
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes(this.$route.params.searchcategory)) {
          this.data.push(x);
        }
      });
      if (this.data == "") this.error = "Henüz bu etikette soru sorulmadı.";
    },
    updateLike(value, status) {
      const likesId = { userid: this._getCurrentUser.id };
      console.log(value);
      console.log(status);

      if (status > -1) {
        this.$appAxios.put("deletet/forum/deletelike/" + value, likesId).then(() => {
          this.getData();
          // this.$store.commit("addToLikes", value);
          console.log("silindi");
        });
      } else {
        this.$appAxios.put("deletet/forum/updatelike/" + value, likesId).then(() => {
          this.getData();
          // this.$store.commit("addToLikes", value);
          console.log("eklendi");
        });
      }
    },
  },
};
</script>

<style scoped>
span[likes*="true"] {
  color: red !important;
  opacity: 1 !important;
}
.forum-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
}
.forum-title > span {
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  color: #1d3557;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
