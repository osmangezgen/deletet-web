<template>
  <div class="col-md-3 mt-4 mb-4">
    <input type="checkbox" name="toggle" id="toggle" />
    <label for="toggle"><i class="far fa-compass"></i></label>
    <div class="nagivation card mobil-none">
      <ul class="mt-2">
        <h3><i class="fas fa-long-arrow-alt-right"></i> Başlıklar</h3>
        <div class="mt-2">
          <router-link :to="{ name: 'forum' }"><li>Son Sorular</li></router-link>
          <router-link :to="{ name: 'categories' }"><li>Kategoriler</li></router-link>
          <router-link to="s"><li>Cevaplanmamış Sorular</li></router-link>
          <router-link to="s"><li>Çözülmemiş Sorular</li></router-link>
        </div>
      </ul>
      <ul class="mt-4 mb-4">
        <h3><i class="fas fa-long-arrow-alt-right"></i> Popüler Etiketler</h3>
        <div class="mt-2">
          <a href=""
            ><li>#java <small>+24</small></li></a
          >
          <a href=""
            ><li>#flutter<small>+10</small></li></a
          >
          <a href=""
            ><li>#php<small>+8</small></li></a
          >
          <a href=""
            ><li>#javascript<small>+2</small></li></a
          >
          <a href=""
            ><li>#c++<small>+2</small></li></a
          >
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fa-question-circle {
  font-size: 18px;
}
input {
  display: none;
}
input[type="checkbox"] + label {
  box-shadow: 0 0 5px grey;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
input[type="checkbox"]:checked + label + div {
  display: block;
}
.nagivation {
  transition: 0.5s all;
}
</style>
