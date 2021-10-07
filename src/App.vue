<template>
  <div>
    <div class="nav" id="nav-tab">
      <router-link class="nav-link" to="/"><i class="fas fa-globe"></i> Covid-19 全球疫情</router-link>
      <router-link class="nav-link" to="/chart"><i class="fas fa-chart-bar"></i> 圖表統計</router-link>
      <router-link class="nav-link" to="/map"><i class="fas fa-map-marked-alt"></i> 世界地圖</router-link>
      </div>
    <router-view/>
    <div class="container-fluid bg-success text-light">
      <footer class="d-flex row justify-content-center py-3 border-top">
          <p>資料來源：<a class="text-light" href="https://corona.lmao.ninja/docs/#/">NOVEL covid-19 API</a></p>
        <div class="d-flex flex-wrap justify-content-center">
          <span class="text-light">&copy; 2021.9&emsp;</span>
          <li class="list-unstyled ms-4"><a class="text-muted text-light" href="https://github.com/dobi8422"><i class="fab fa-github text-light"></i></a>&ensp;dobi8422</li>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav-tab {
  a {
    font-weight: bold;
    color: #42b983;
    &.router-link-exact-active {
      background-color: #42b983;
      color: white;
    }
  }
}
.mainpage{
  min-height: calc(100vh - 137px);
}
</style>
