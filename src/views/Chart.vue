<template>
  <div class="mainpage container-fluid py-3 px-5">
    <p class="text-muted">最後更新時間：{{ timeString }}</p>
    <div class="row g-3">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card">
          <div class="card-body fs-4">
            <i class="fas fa-user-plus"></i>
            <p class="mb-0">今日新增確診</p>
            <p class="card-text">{{ ThousandsComma(today_state.todayCases) }}人</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card">
          <div class="card-body fs-4">
            <i class="fas fa-dizzy"></i>
            <p class="mb-0">今日新增死亡</p>
            <p class="card-text">{{ ThousandsComma(today_state.todayDeaths) }}人</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card">
          <div class="card-body fs-4">
            <i class="fas fa-hospital-alt"></i>
            <p class="mb-0">累計確診人數</p>
            <p class="card-text">{{ ThousandsComma(today_state.cases) }}人</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card">
          <div class="card-body fs-4">
            <i class="fas fa-skull-crossbones"></i>
            <p class="mb-0">累計死亡人數</p>
            <p class="card-text">{{ ThousandsComma(today_state.deaths) }}人</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="card">
          <h5 class="card-header">累計確診排名</h5>
          <div class="card-body content">
            <div id="total_case_chart"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="card">
          <h5 class="card-header">今日確診排名</h5>
          <div class="card-body content">
            <div id="today_case_chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'testchart',
  data: () => ({
    today_state: [],
    rankTotal: [],
    rankToday: []
  }),
  methods: {
    chart_total () {
      const content = document.querySelector('#total_case_chart')
      content.innerHTML = ''
      const padding = 30
      const w = parseInt(d3.select('.content').style('width'), 10)
      const h = 360
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(this.rankTotal, (d) => d[0])])
        .range([padding, w - 2 * padding])
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.rankTotal, (d) => d[1])])
        .range([h - padding, padding])
      const svg = d3.select('#total_case_chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
      svg.selectAll('rect')
        .data(this.rankTotal)
        .enter()
        .append('rect')
        .attr('x', padding)
        .attr('y', (d, i) => i * 30 + 35)
        .attr('width', (d) => xScale(d[0] * 0.9))
        .attr('height', 20)
        .style('fill', 'rgb(62, 51, 156)')
        .attr('class', 'hello')
      svg.selectAll('text')
        .data(this.rankTotal)
        .enter()
        .append('text')
        .text((d) => d[1])
        .attr('x', (d) => xScale(d[0]) * 0.9 + 40)
        .attr('y', (d, i) => i * 30 + 50)
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)
      svg.append('g')
        .attr('transform', `translate(0,${h - padding})`)
        .call(xAxis)
      svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis)
      svg.append('rect')
        .attr('x', w - 175)
        .attr('y', h - padding - 32)
        .attr('width', '10')
        .attr('height', '10')
        .style('fill', 'rgb(62, 51, 156)')
        .style('stroke', 'black')
        .style('stroke-width', 0.4)
      svg.append('text')
        .attr('x', w - 160)
        .attr('y', h - padding - 20)
        .text('累計確診人數')
    },
    chart_today () {
      const content = document.querySelector('#today_case_chart')
      content.innerHTML = ''
      const padding = 30
      const w = parseInt(d3.select('.content').style('width'), 10)
      const h = 360
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(this.rankToday, (d) => d[0])])
        .range([padding, w - 2 * padding])
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.rankToday, (d) => d[1])])
        .range([h - padding, padding])
      const svg = d3.select('#today_case_chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
      svg.selectAll('rect')
        .data(this.rankToday)
        .enter()
        .append('rect')
        .attr('x', padding)
        .attr('y', (d, i) => i * 30 + 35)
        .attr('width', (d) => xScale(d[0] * 0.9))
        .attr('height', 20)
        .style('fill', '#42b983')
        .attr('class', 'hello')
      svg.selectAll('text')
        .data(this.rankToday)
        .enter()
        .append('text')
        .text((d) => d[1])
        .attr('x', (d) => xScale(d[0]) * 0.9 + 40)
        .attr('y', (d, i) => i * 30 + 50)
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)
      svg.append('g')
        .attr('transform', `translate(0,${h - padding})`)
        .call(xAxis)
      svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis)
      svg.append('rect')
        .attr('x', w - 175)
        .attr('y', h - padding - 32)
        .attr('width', '10')
        .attr('height', '10')
        .style('fill', '#42b983')
        .style('stroke', 'black')
        .style('stroke-width', 0.4)
      svg.append('text')
        .attr('x', w - 160)
        .attr('y', h - padding - 20)
        .text('今日確診人數')
    },
    get_today_state () {
      const url = 'https://corona.lmao.ninja/v3/covid-19/all'
      this.axios.get(url).then(res => { this.today_state = res.data })
        .catch(err => { console.log(err) })
    },
    get_all_data () {
      const url = 'https://corona.lmao.ninja/v3/covid-19/countries'
      const loader = this.$loading.show()
      this.axios.get(url).then(res => {
        const total = JSON.parse(JSON.stringify(res.data)).sort((a, b) => b.cases - a.cases)
        const today = JSON.parse(JSON.stringify(res.data)).sort((a, b) => b.todayCases - a.todayCases)
        console.log(total, today)
        for (let i = 0; i < 10; i++) {
          this.rankTotal.push([total[i].cases, total[i].country])
          this.rankToday.push([today[i].todayCases, today[i].country])
        }
        this.chart_total()
        this.chart_today()
        loader.hide()
      }).catch(err => { console.log(err) })
    },
    ThousandsComma (num) {
      return (num + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
    }
  },
  computed: {
    timeString () {
      const updatedTime = new Date(this.today_state.updated)
      return updatedTime.toLocaleString()
    }
  },
  mounted () {
    this.get_today_state()
    this.get_all_data()
    window.onresize = () => {
      this.chart_total()
      this.chart_today()
    }
  }
}
</script>

<style lang="scss">
  .hello:hover{
    opacity: 0.7;
  }
  .content{
    display: block;
    width: 100%;
    height: 100%;
    min-width: 300px;
    max-width: 960px;
    max-height: 500px;
    overflow: hidden;
  }
</style>
