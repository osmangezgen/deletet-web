<template>
  <div class="col-md-3 mt-4 mobil-none sidebar-align">
    <div class="mobil-adv">
      <img
        class="sidebar-img"
        src="images/Mobil-adv.jpg"
        alt=""
        height="300"
        width="223.5"
      />
    </div>
    <div class="float-clear"></div>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="images/forUsers.jpg" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="images/forUsers2.jpg" class="d-block w-100" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
