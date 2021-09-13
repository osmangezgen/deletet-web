<template>
  <div class="forum container mt-4">
    <div class="row">
      <add-question @onSaved="onSaved"></add-question>
      <nagivation-sidebar></nagivation-sidebar>
      <div class="col-md-9 mt-4 forum-content">
        <div class="forum-title">
          <span>Son Sorular</span>
          <span v-if="_getCurrentUser != null">
            <button
              type="button"
              class="btn btn-secondary add-question"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              + Soru Sor
            </button></span
          >
        </div>
        <div class="d-flex mt-4">
          <input
            class="form-control"
            type="search"
            placeholder="Etiket ara.."
            aria-label="Search"
            v-model="tagText"
            @keydown.enter="addItem"
          />
          <!-- <button class="btn btn-outline-primary" type="button" @click="clearTag">
            Temizle
          </button> -->
        </div>
        <div v-if="tag" class="tag-list">
          <div class="tag" v-for="item in tag" :key="item">
            <span @click="deleteItem(item)">#{{ item }} </span>
          </div>
        </div>
        <div v-if="tag.length >= 1 && filteredData == ''">
          <div class="alert alert-warning" role="alert">
            Aradığınız etiketlerde soru bulunamadı!
          </div>
        </div>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>

        <!-- v-for="index in 3" :key="index" -->

        <div class="question-list">
          <div class="question card" v-for="item in filteredData" :key="item.id">
            <div class="question-profil">
              <div>
                <span v-if="item.imgUrl != null"
                  ><img :src="item.imgUrl" alt="" height="40" width="40" />
                </span>
                <span v-else
                  ><img src="images/user.png" alt="" height="40" width="40"
                /></span>
                <span>{{ item.fullname }}</span>
                <small>{{
                  moment(
                    reverseDate(item.date.split(" ")[0]) + " " + item.date.split(" ")[1]
                  ).fromNow()
                }}</small>
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
                  <div class="question-tag" v-if="item.languages != ''">
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
var moment = require("moment");
moment.locale("tr");
import NagivationSidebar from "../components/Forum/NagivationSidebar.vue";
import AddQuestion from "../components/Forum/AddQuestion.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
  components: {
    NagivationSidebar,
    AddQuestion,
  },
  data() {
    return {
      moment: moment,
      tagText: null,
      tag: [],
      forumData: [],
      error: null,
      filteredData: [],
    };
  },
  methods: {
    reverseDate(date) {
      return date.split("-").reverse().join("-");
    },
    addItem() {
      if (this.tag.length < 3) {
        this.tag.push(this.tagText);
        this.tagText = null;
        this.listData();
      } else {
        this.error = "En fazla 3 etiket eklenebilir !";
        this.tagText = null;
      }
    },
    deleteItem(item) {
      let index = this.tag.indexOf(item);
      if (index !== -1) this.tag.splice(index, 1);
      // this.tag = this.tag.filter((x) => x != item);
      this.listData();
    },
    clearTag() {
      this.tag = [];
    },
    listData() {
      this.filteredData = this.forumData.filter((x) => {
        return this.tag.every((f) => x.languages.split(",").includes(f));
      });
    },
    getData() {
      this.$appAxios.get("deletet/forum/readAll").then((x) => {
        this.forumData = x.data;
        this.filteredData = x.data;
      });
    },
    onSaved() {
      setTimeout(() => {
        this.getData();
      }, 500);
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
  created() {
    this.getData();
  },
  watch: {
    error() {
      setTimeout(() => {
        this.error = null;
      }, 4000);
    },
  },
};
</script>

<style scoped>
span[likes*="true"] {
  color: red !important;
  opacity: 1 !important;
}
.active-item {
  color: red !important;
}
.forum-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forum-title > span {
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  color: #1d3557;
  font-weight: bold;
  letter-spacing: 1px;
}
.btn-outline-primary {
  border-color: #457b9d;
  color: #457b9d;
}
.btn-outline-primary:hover {
  color: white;
  background-color: #457b9d;
}
.btn-outline-primary:active {
  color: white;
  background-color: #457b9d;
}
.add-question {
  background: #1d3557;
}
.add-question:focus {
  color: white;
  background-color: #1d3557;
  box-shadow: 0 0 0 0.25rem rgb(29 53 87 / 50%);
  border-color: 29, 53, 87;
}
.bookmark:hover {
  color: orange;
}
.heart:hover {
  color: red;
}
.arrow:hover {
  color: #27ae60;
}
.commend:hover {
  color: #2980b9;
}
.fa-chevron-up:hover {
  color: #27ae60;
}
.fa-chevron-down:hover {
  color: #e74c3c;
}
</style>
