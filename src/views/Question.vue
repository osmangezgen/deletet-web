<template>
  <div class="forum container mt-4">
    <div class="row">
      <nagivation-sidebar></nagivation-sidebar>
      <div class="col-md-9 mt-4">
        <div class="question-owner">
          <div class="answer card">
            <div class="answer-profil">
              <span v-if="questionData.imgUrl != null">
                <img :src="questionData.imgUrl" alt="" height="40" width="40"
              /></span>
              <span v-else>
                <img src="YOUR API URL/images/user.png" alt="" height="40" width="40"
              /></span>
              <span>{{ questionData.fullname }}</span>
              <small>{{
                moment(
                  reverseDate(questionData.date.split(" ")[0]) +
                    " " +
                    questionData.date.split(" ")[1]
                ).fromNow()
              }}</small>
            </div>
            <h1>{{ questionData.title }}</h1>
            <p>
              {{ questionData.explanation }}
            </p>
            <div class="body" v-if="questionData.body != null">
              <v-ace-editor
                v-model:value="questionData.body"
                @init="editorInit"
                lang="text"
                theme="chrome"
                style="height: 200px; background: #1d3557; color: white"
              />
            </div>
          </div>
          <div class="question-spam">
            <span><i class="fas fa-exclamation-circle"></i></span>
            <div>
              <h3>Soru Hatalı mı?</h3>
              <p>Sorunun topluluk kurallarını ihlal ettiğini mi düşünüyorsunuz?</p>
              <button type="button" class="btn btn-dark">
                Spam olarak işaretle<i class="far fa-thumbs-down ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- answer -->
        <div
          class="answer card ms-4"
          v-for="item in answerData"
          :key="item.id"
          :status="item.owner"
        >
          <div>
            <div class="answer-tag">
              <i class="fas fa-reply"></i>
            </div>
            <div class="answer-profil">
              <span v-if="item.imgUrl != null"
                ><img :src="item.imgUrl" alt="" height="40" width="40"
              /></span>
              <span v-else
                ><img src="YOUR API URL/images/user.png" alt="" height="40" width="40"
              /></span>
              <span>{{ item.fullname }}</span>
              <small>{{
                moment(
                  reverseDate(item.date.split(" ")[0]) + " " + item.date.split(" ")[1]
                ).fromNow()
              }}</small>
            </div>
            <p>
              {{ item.explanation }}
            </p>
            <div class="body" v-if="item.body != null">
              <v-ace-editor
                v-model:value="item.body"
                @init="editorInit"
                lang="text"
                theme="chrome"
                style="height: 200px; background: #1d3557; color: white"
              />
            </div>
            <div
              class="checked"
              v-if="
                this.questionData.fullname == _getCurrentUser.fullName &&
                item.owner == false
              "
            >
              <div>
                <button type="button" class="btn btn-outline-success mt-2">
                  <i class="fas fa-check"></i> Doğru Cevap
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="your-answer">
          <h3>Cevap yaz</h3>
          <textarea
            class="form-control"
            placeholder="Cevabınızı buraya yazınız.."
            v-model="addAnswerData.explanation"
          ></textarea>
          <div class="your-answer-code2" v-if="codeStatus == true">
            <v-ace-editor
              @init="editorInit"
              lang="text"
              theme="chrome"
              style="height: 200px; background: #1d3557; color: white"
              placeholder="Hello word :)"
              v-model:value="addAnswerData.body"
            />
          </div>
          <div class="your-answer-submit">
            <input
              type="hidden"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              ref="login"
            />
            <button type="button" class="btn btn-dark me-2" @click="codeAdd">
              {{ codeAddText }}
            </button>
            <button type="button" class="btn btn-success" @click="addAnswerDataQR">
              Cevapla
            </button>
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
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-text";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["_getCurrentUser", "_getCurrentProfil"]),
  },
  components: {
    NagivationSidebar,
    VAceEditor,
  },
  data() {
    return {
      moment: moment,
      codeStatus: false,
      codeAddText: "Kod Bloğunu Ekle",
      questionData: {},
      answerData: {},
      addAnswerData: {
        userid: null,
        fullname: null,
        question_id: null,
        explanation: null,
        body: "",
        status: "0",
        owner: false,
        imgUrl: null,
      },
      answerOwner: "answerOwner",
    };
  },
  methods: {
    reverseDate(date) {
      return date.split("-").reverse().join("-");
    },
    codeAdd() {
      if (this.codeStatus == false) {
        (this.codeAddText = "Kod Bloğunu Kaldır"), (this.codeStatus = !this.codeStatus);
      } else {
        (this.codeAddText = "Kod Bloğu Ekle"), (this.codeStatus = !this.codeStatus);
      }
    },
    getAnswer() {
      this.$appAxios.get("deletet/answer/read/" + this.$route.params.id).then((x) => {
        this.answerData = x.data;
      });
    },
    addAnswerDataQR() {
      if (this._getCurrentUser == null) {
        this.$refs.login.click();
      } else {
        this.addAnswerData.userid = this._getCurrentUser.id;
        this.addAnswerData.fullname = this._getCurrentUser.fullName;
        this.addAnswerData.question_id = this.$route.params.id;
        this.addAnswerData.imgUrl = this._getCurrentProfil.imageUrl;
        if (this.codeStatus == false) this.addAnswerData.body = null;
        if (this._getCurrentUser.fullName == this.questionData.fullname)
          this.addAnswerData.owner = true;
        this.$appAxios.post("deletet/answer/create", this.addAnswerData).then((x) => {
          console.log("eklendi", x);
          this.codeStatus = false;
          this.addAnswerData.explanation = null;
          this.getAnswer();
        });
      }
    },
  },
  created() {
    this.$appAxios.get("deletet/forum/read/" + this.$route.params.id).then((x) => {
      this.questionData = x.data;
    });
    this.getAnswer();
  },
};
</script>

<style scoped>
div[status*="true"] {
  margin-left: -1px !important;
  margin-right: 20px;
}
.answer {
  margin-top: 30px;
}
.answer:first-child {
  margin-top: 0;
}
.answer:last-child {
  margin-bottom: 30px;
}
</style>
