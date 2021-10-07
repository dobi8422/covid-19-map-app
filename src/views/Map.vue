<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <h3 class="mt-3">請選擇欲查詢的國家</h3>
        <select class="form-control mb-1" name="continent" v-model="select.continent" @change="removeMarker(), updateMap(), select.country = ''">
          <option v-for="continent in continentFilter" :value="continent" :key="continent">{{ continent }}</option>
        </select>
        <select class="form-control" name="country" v-model="select.country" @change="updateCountryMap">
          <option value="" disabled>---請選擇國家---</option>
          <option v-for="country in countryFilter" :value="country.country" :key="country.country">{{ country.country }}</option>
        </select>
        <div class="info mt-4 text-center">
          <div class="fs-1" v-if="dataLoading"><i class="fas fa-spinner fa-spin"></i></div>
          <div v-if="dataFilter">
            <img class="flag" :src="dataFilter.countryInfo.flag" alt="國家國旗" />
            <div class="h4 mt-4">
              今日確診人數: <br/><strong class="text-danger">{{ ThousandsComma(dataFilter.todayCases) }}</strong>人<br/>
              Today Cases: <strong class="text-danger">{{ ThousandsComma(dataFilter.todayCases) }}</strong> <br/>
              <div class="h6 mt-3">最後更新時間 : <br/>{{ timeString }}</div>
            </div>
          </div>
          <div class="h4" v-else-if="!dataFilter">請先選擇國家</div>
        </div>
      </div>
      <div class="col-lg-9 p-0">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import countryName from '../assets/countryName.json'

let osmMap = {}
const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -45],
  shadowSize: [41, 41]
})

export default {
  name: 'Map',
  data: () => ({
    countryName,
    select: {
      continent: 'Asia',
      country: 'Taiwan'
    },
    dataLoading: false,
    covidData: []
  }),
  methods: {
    ThousandsComma (num) {
      const reg = /\d{1,3}(?=(\d{3})+$)/g
      return (num + '').replace(reg, '$&,')
    },
    updateMap () {
      const continentData = this.covidData.filter(item => {
        return item.continent.split('/').pop() === this.select.continent
      })
      continentData.forEach(item => {
        const { lat, long } = item.countryInfo
        L.marker([lat, long], { icon: goldIcon }).addTo(osmMap).bindPopup(`
          <strong class="h6">${item.country}</strong>
          <br>
              今日新增病例: <strong>${item.todayCases}</strong>人 <br>
              目前活躍病例: ${item.active} 人<br>
              累積病例: ${item.cases}人<br>
              累積死亡: ${item.deaths} 人<br>
            <small>更新時間: ${this.timeString}</small>
        `)
      })
      if (continentData[0].continent !== 'Asia') {
        osmMap.panTo([
          continentData[0].countryInfo.lat,
          continentData[0].countryInfo.long
        ])
      } else { this.panTo(23.5, 121) }
    },
    updateCountryMap () {
      if (this.dataFilter) {
        const { lat, long } = this.dataFilter.countryInfo
        this.panTo(lat, long)
      } else { alert('無此國家資料') }
    },
    removeMarker () {
      osmMap.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          osmMap.removeLayer(layer)
        }
      })
    },
    // 重新定位地圖
    panTo (lat, long) {
      osmMap.panTo([lat, long])
      L.marker([lat, long]).addTo(osmMap).bindPopup(`
        <strong class="h6">${this.dataFilter.country}</strong><br>
        今日新增病例: <strong>${this.dataFilter.todayCases}</strong>人 <br>
        目前活躍病例: ${this.dataFilter.active} 人<br>
        累積病例: ${this.dataFilter.cases}人<br>
        累積死亡: ${this.dataFilter.deaths} 人<br>
        <small>更新時間: ${this.timeString}</small>
      `).openPopup()
    }
  },
  computed: {
    continentFilter () {
      const continents = []
      this.countryName.forEach(item => { continents.push(item.continent) })
      return continents.filter((item, index, ary) => {
        return ary.indexOf(item) === index
      })
    },
    countryFilter () {
      return this.countryName.filter(item => { return item.continent === this.select.continent })
    },
    dataFilter () {
      return this.covidData.find(item => { return item.country === this.select.country })
    },
    timeString () {
      return new Date(this.dataFilter.updated).toLocaleString()
    }
  },
  mounted () {
    // 初始化地圖，定位在台灣
    osmMap = L.map('map', { center: [23.5, 121], zoom: 6 })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' })
      .addTo(osmMap)
    L.marker([23.5, 121]).addTo(osmMap)
    // 取得covid-19資料
    const url = 'https://corona.lmao.ninja/v3/covid-19/countries'
    this.dataLoading = true
    this.$http.get(url).then((res) => {
      if (res.status === 200) {
        this.covidData = res.data
        this.updateMap()
        this.dataLoading = false
      }
    }).catch((err) => { console.log(err) })
  }
}
</script>

<style lang="scss" scoped>
.flag {
  width: 180px;
  height: 130px;
  border-radius: 10px;
}
#map {
  height: 100vh;
}
</style>
