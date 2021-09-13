<template>
  <div class="forum container mt-4">
    <div class="row">
      <nagivation-sidebar></nagivation-sidebar>
      <div class="col-md-9 mt-4 forum-content">
        <div class="forum-title">
          <span>Kategoriler</span>
        </div>
        <div class="categories-list">
          <div class="categories">
            <div class="card">
              <img src="YOUR API URL/images/js.png" height="100" width="100" />
              <h3>#Javascript</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ javascript.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'javascript' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>

          <div class="categories">
            <div class="card">
              <img src="YOUR API URL/images/php.svg" height="100" width="100" />
              <h3>#php</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ php.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'php' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>

          <div class="categories">
            <div class="card">
              <img src="YOUR API URL/images/python.png" height="100" width="100" />
              <h3>#Python</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ ptyhon.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'python' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
          <div class="categories mt-3">
            <div class="card">
              <img src="YOUR API URL/images/flutter.jpg" height="100" width="100" />
              <h3>#Flutter</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ flutter.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'flutter' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
          <div class="categories mt-3">
            <div class="card">
              <img src="YOUR API URL/images/java.jpg" height="100" width="100" />
              <h3>#Java</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ java.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'java' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
          <div class="categories mt-3">
            <div class="card">
              <img src="YOUR API URL/images/css.jpg" height="100" width="100" />
              <h3>#Css</h3>
              <table>
                <tr class="categories-title">
                  <td>Sorular:</td>
                  <td>Cevaplar:</td>
                </tr>
                <tr>
                  <td>{{ css.length }} Soru</td>
                  <td>0 Cevap</td>
                </tr>
              </table>
              <hr />
              <router-link
                :to="{ name: 'searchcategory', params: { searchcategory: 'css' } }"
                >Sorulara bak <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NagivationSidebar from "../components/Forum/NagivationSidebar.vue";
export default {
  components: {
    NagivationSidebar,
  },
  data() {
    return {
      forumData: [],
      javascript: [],
      php: [],
      ptyhon: [],
      flutter: [],
      java: [],
      css: [],
    };
  },
  created() {
    this.$appAxios.get("deletet/forum/readAll").then((x) => {
      this.forumData = x.data;
      this.phpCount();
      this.javascriptCount();
      this.ptyhonCount();
      this.flutterCount();
      this.javaCount();
      this.cssCount();
    });
  },
  methods: {
    javascriptCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("javascript")) {
          this.javascript.push(x);
        }
      });
    },
    phpCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("php")) {
          this.php.push(x);
        }
      });
    },
    ptyhonCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("python")) {
          this.ptyhon.push(x);
        }
      });
    },
    flutterCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("flutter")) {
          this.flutter.push(x);
        }
      });
    },
    javaCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("java")) {
          this.java.push(x);
        }
      });
    },
    cssCount() {
      this.forumData.forEach((x) => {
        if (x.languages.split(",").includes("css")) {
          this.css.push(x);
        }
      });
    },
  },
};
</script>

<style scoped>
.forum-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.forum-title > span {
  font-size: 25px;
  font-family: "Poppins", sans-serif;
  color: #1d3557;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
