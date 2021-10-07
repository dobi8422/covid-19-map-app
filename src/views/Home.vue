<template>
  <div class="container">
    <div class="mainpage row">
      <div class="my-auto d-flex-row-md justify-content-center">
        <router-link class="g-col-2 btn btn-success p-5 fs-2 m-5 text-light" to="/chart">圖表統計</router-link>
        <router-link class="g-col-2 btn btn-success p-5 fs-2 m-5 text-light" to="/map">世界地圖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
