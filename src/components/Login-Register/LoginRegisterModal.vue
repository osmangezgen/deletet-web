<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="row">
          <div class="col-md-7">
            <img src="YOUR API URL/images/LoginModal.jpg" alt="" height="500" />
          </div>
          <div class="col-md-5">
            <div class="switch">
              <p>
                <input
                  @click="login"
                  :style="switchStatus.switchLeft"
                  value="Giriş Yap"
                  readonly
                />
                <input
                  @click="register"
                  :style="switchStatus.switchrRight"
                  value="Kayıt Ol"
                  readonly
                />
              </p>
            </div>

            <div class="login-text j-login" v-if="switchStatus.status == true">
              <div>
                <h1 class="">Giriş Yap</h1>
                <form>
                  <input
                    type="text"
                    class="form-control main-text"
                    placeholder="Email:"
                    v-model="userDataLogin.email"
                  />
                  <input
                    type="password"
                    class="form-control main-text"
                    placeholder="Şifre:"
                    v-model="userDataLogin.password"
                  />
                  <div>
                    <div class="alert alert-danger" role="alert" v-if="errorLogin">
                      {{ errorLogin }}
                    </div>
                  </div>
                  <div class="recaptcha">
                    <div class="recaptcha">
                      <vue-recaptcha
                        v-if="showRecaptcha"
                        siteKey="YOUR RECAPTCHA SITE KEY"
                        size="normal"
                        theme="light"
                        :tabindex="0"
                        @verify="recaptchaVerified"
                        @expire="recaptchaExpired"
                        @fail="recaptchaFailed"
                        ref="vueRecaptcha"
                      >
                      </vue-recaptcha>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref="hide"
                    style="display: none"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary submit"
                    @click="onSavedLogin"
                  >
                    Giriş Yap
                  </button>
                </form>
              </div>
            </div>
            <div class="login-text register" v-else>
              <div>
                <h1 class="">Kayıt Ol</h1>
                <form>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ad-Soyad:"
                    v-model="userDataRegister.fullName"
                    name="name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email:"
                    v-model="userDataRegister.email"
                    name="email"
                  />
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Şifre:"
                    v-model="userDataRegister.password"
                  />
                  <div
                    class="alert alert-danger animate__animated"
                    role="alert"
                    v-if="errorRegister"
                  >
                    {{ errorRegister }}
                  </div>
                  <div class="recaptcha">
                    <div class="recaptcha">
                      <vue-recaptcha
                        v-if="showRecaptcha"
                        siteKey="YOUR RECAPTCHA SITE KEY"
                        size="normal"
                        theme="light"
                        :tabindex="0"
                        @verify="recaptchaVerified"
                        @expire="recaptchaExpired"
                        @fail="recaptchaFailed"
                        ref="vueRecaptcha"
                      >
                      </vue-recaptcha>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary submit"
                    @click="onSavedRegister"
                  >
                    Kayıt Ol
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueRecaptcha from "vue3-recaptcha2";

export default {
  components: { vueRecaptcha },
  props: ["switchStatus"],
  data() {
    return {
      userDataRegister: {
        fullName: "",
        email: "",
        password: "",
        role: 1,
      },
      userDataLogin: {
        email: "osman@gmail.com",
        password: "123",
      },
      showRecaptcha: true,
      robot: false,
      errorLogin: null,
      errorRegister: null,
      userProfileData: null,
      likesData: null,
      test: {},
    };
  },
  methods: {
    login() {
      this.robot = false;
      this.$emit("switchLeftModal");
    },
    register() {
      this.robot = false;
      this.$emit("switchrRightModal");
    },
    recaptchaVerified(response) {
      if (response) this.robot = true;
    },
    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
    },
    onSavedLogin() {
      if (this.userDataLogin.email == "" || this.userDataLogin.password == "") {
        this.errorLogin = "Tüm kutucukları doldurunuz !!";
      } else if (this.robot == false) {
        this.errorLogin = "Recaptcha boş bırakılamaz !!";
      } else {
        this.errorLogin = null;
        this.$appAxios
          .post("deletet/signin", this.userDataLogin)
          .then((x) => {
            this.$refs.hide.click();
            this.$appAxios.get("deletet/profile/" + x.data.id).then((response) => {
              this.userProfileData = response.data;
            });
            setTimeout(() => {
              this.$store.commit("setProfil", this.userProfileData[0]);
              this.$store.commit("setUser", x.data);
            }, 500);
            // window.location.reload();
            this.recaptchaExpired();
            this.userDataLogin.email = "";
            this.userDataLogin.password = "";
          })
          .catch(() => {
            this.errorLogin = "Girilen bilgiler hatalı.";
          });
      }
    },
    onSavedRegister() {
      if (
        this.userDataRegister.email == "" ||
        this.userDataRegister.password == "" ||
        this.userDataRegister.name == ""
      ) {
        this.errorRegister = "Tüm kutucukları doldurunuz !!";
      } else if (this.robot == false) {
        this.errorRegister = "Recaptcha boş bırakılamaz !!";
      } else {
        this.errorRegister = null;
        this.$appAxios
          .post("deletet/register", this.userDataRegister, { useCredentails: true })
          .then(() => {
            this.login();
            this.recaptchaExpired();
            this.userDataRegister.fullName = "";
            this.userDataRegister.email = "";
            this.userDataRegister.password = "";
          })
          .catch(() => {
            this.errorRegister = "Bir hata oluştu.";
          });
      }
    },
  },
  // watch: {
  //   errorLogin() {
  //     setTimeout(() => {
  //       this.errorLogin = "";
  //     }, 5000);
  //   },
  //   errorRegister() {
  //     setTimeout(() => {
  //       this.errorRegister = "";
  //     }, 5000);
  //   },
  // },
};
</script>

<style scoped>
.submit {
  border: none;
}
.alert {
  display: flex;
  align-items: center;
  height: 38px;
  width: 300px;
  font-size: 16px;
}
</style>
