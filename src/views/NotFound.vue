<template>
  <div class="container mt-4">
    <div class="row 404-Page">
      <div class="col-md-12 lottie">
        <lottie-player
          class="lottie-player"
          src="https://assets2.lottiefiles.com/temp/lf20_LJK4oD.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player>

        <div class="notfound">
          <h1>404 Error..</h1>
          <p>Aradığınız sayfa bulunamadı!!</p>
          <router-link :to="{ name: 'home' }">Anasayfaya Dön</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.lottie {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}
.notfound {
  margin-top: 50px;
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.75);
}
.notfound h1 {
  font-size: 48px;
}
.notfound p {
  margin-top: 25px;
}
.notfound a {
  text-decoration: none;
  display: inline-block;
  border-radius: 50px;
  padding: 8px 24px;
  font-size: 16px;
  cursor: pointer;
  background: #457b9d;
  color: #fff;
  border: none;
  box-shadow: 0 4px 8px 0 #ccc;
  margin-left: 30px;
  margin-top: 25px;
}
</style>
