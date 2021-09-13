<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <span>deleTeT Forum</span>
        </div>
        <div class="modal-body">
          <!-- <div class="add-question-profil">
            <img src="images/osmangezgen-min.png" alt="" height="60" width="60" />
            <span>Osman Gezgen</span>
          </div> -->
          <div class="add-question-body">
            <div class="text">
              <p>Başlık:</p>
              <input
                type="text"
                class="form-control"
                placeholder="Soru başlığını giriniz.."
                v-model="questionData.title"
              />
            </div>
            <div class="text">
              <p>Açıklama:</p>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
                placeholder="Soru açıklamasını giriniz.."
                v-model="questionData.explanation"
              ></textarea>
            </div>
            <div v-if="codeStatus == true">
              <v-ace-editor
                class="codebody"
                @init="editorInit"
                lang="text"
                theme="chrome"
                style="height: 200px; background: #1d3557; color: white"
                placeholder="Hello word :)"
                v-model:value="questionData.body"
              />
            </div>
            <div class="text">
              <p>Etiket Ekle</p>
              <input
                class="form-control add-tag"
                type="search"
                placeholder="Soruya etiket ekleyiniz.."
                aria-label="Search"
                v-model="tagText"
                @keydown.enter="addItem"
              />
            </div>
            <div class="row">
              <div class="col-md-8">
                <button type="button" class="btn btn-dark" @click="codeAdd">
                  {{ codeAddText }}
                </button>
              </div>
              <div class="col-md-4">
                <div v-if="tag" class="tag-list">
                  <div class="tag" v-for="item in tag" :key="item">
                    <span @click="deleteItem(item)">#{{ item }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div>
            <div v-if="error" type="button" class="alert alert-danger">{{ error }}</div>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-secondary me-2"
              data-bs-dismiss="modal"
              ref="close"
            >
              Kapat
            </button>
            <button type="button" class="btn btn-success" @click="addQuestion">
              Soruyu Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-text";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_getCurrentUser", "_getCurrentProfil"]),
  },
  components: {
    VAceEditor,
  },
  data() {
    return {
      tagText: null,
      tag: [],
      codeStatus: true,
      codeAddText: "Kod Bloğunu Kaldır",
      error: null,
      questionData: {
        fullname: null,
        title: null,
        explanation: null,
        body: "",
        languages: null,
        status: "0",
        imgUrl: null,
      },
    };
  },
  methods: {
    addItem() {
      if (this.tag.length < 3) {
        this.tag.push(this.tagText);
        this.tagText = null;
      } else {
        this.error = "En fazla 3 etiket eklenebilir !";
        this.tagText = null;
      }
    },
    deleteItem(item) {
      this.tag = this.tag.filter((x) => x != item);
    },
    codeAdd() {
      if (this.codeStatus == false) {
        (this.codeAddText = "Kod Bloğunu Kaldır"), (this.codeStatus = !this.codeStatus);
      } else {
        (this.codeAddText = "Kod Bloğu Ekle"), (this.codeStatus = !this.codeStatus);
      }
    },
    addQuestion() {
      if (
        this.questionData.title == null ||
        this.questionData.explanation == null ||
        this.tag == ""
      ) {
        this.error = "Tüm alanları doldurunuz!!";
      } else {
        this.questionData.fullname = this._getCurrentUser.fullName;
        this.questionData.languages = this.tag.join();
        this.questionData.imgUrl = this._getCurrentProfil.imageUrl;
        if (this.codeStatus == false) this.questionData.body = null;
        this.$appAxios.post("deletet/forum/create", this.questionData).then((x) => {
          console.log("eklendi", x);
        });
        this.$refs.close.click();
        this.$emit("onSaved");
        this.questionData.title = null;
        this.questionData.explanation = null;
        this.questionData.body = "";
        this.questionData.languages = null;
        this.questionData.imgUrl = null;
        this.tag = [];
        this.tagText = null;
      }
    },
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
.modal-header {
  display: flex;
  justify-content: center;
}
.modal-header span {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 20px;
}
.add-question-body .text {
  margin: 20px 0;
}
.add-question-body div:first-child {
  margin: 0;
}
.add-question-body div p {
  margin-bottom: 7px;
}
p {
  font-weight: bold;
}
p:first-child {
  padding-top: 0;
}
.tag-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tag-list .tag {
  padding: 8px;
  margin: 5px;
  background-color: #eaeded;
  border-radius: 5px;
  color: #1d3557;
  font-weight: bold;
}
.tag-list .tag:hover {
  background-color: #e63946;
  cursor: pointer;
  color: white;
}
.codebody {
  border-radius: 5px;
  margin: 20px 0;
  transition: 0.5s all;
}
.btn-danger {
  background: #df4759;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
}
</style>
