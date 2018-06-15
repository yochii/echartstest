<template>
  <div class="bodybox">
    <div class="sandybox">
    <div class="bar">bar</div>
    <div class="container">
      <div class="nav" :cat="category">
        <!--总觉得写得很怪。。。-->
        <div id="shadow" :style="{'transform':'translate(0,'+category*50+'px'}"></div>
        <div><button :class="{active:isActive[0],position0:isActive[0]}" @click="testFunc('child_hiv',0)">child_hiv</button></div>
        <div><button :class="{active:isActive[1],position1:isActive[1]}" @click="testFunc('child_malaria',1)"> child_malaria</button></div>
        <div><button :class="{active:isActive[2],position2:isActive[2]}" @click="testFunc('child_meningitis',2)"> child_meningitis</button></div>
        <div><button :class="{active:isActive[3],position3:isActive[3]}" @click="testFunc('child_ncd',3)"> child_ncd</button></div>
      </div>
      <div class="mapa">
        <div id="mychart"></div>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
  let echarts = require('echarts')
  let axios = require('axios');
  //readJson为了处理颜色标尺的问题，因为不统一

  function readJson(file){
    var a=[]
    file.forEach(function (item) {
      a.push(item.value)
    })
    return a
  };

  export default {
    name: 'app',
    data() {
      return {
        category:0,
        isActive:[1,0,0,0],
      }
    },
    watch:{
      category: function(newc,oldc){
        this.isActive.fill(0)
        this.isActive[newc]=1;
      }
    },

    mounted() {
      var mapChart = echarts.init(document.getElementById('mychart'));
      function getMap(){
        return axios.get('src/static/africa.json')
      };

      function getMapData(){
        return axios.get('src/static/child_hiv.json')
      };

      axios.all([getMap(), getMapData()])
        .then(axios.spread(function (map, data) {
          echarts.registerMap('africa', map.data);
          let min = readJson(data.data).sort().reverse()[0];
          let max = readJson(data.data).sort()[0];
          mapChart.setOption({
            title:{
              text:'Africa Country Health Data Report in 2015',
              show:true,
              top:'5%',
              left:'right',
              subtext:'child_hiv',
            },
            visualMap: {
              left:40,
              bottom:'5%',
              itemWidth: 30,
              itemHeight: 120,
              min: min,
              max: max,
              calculable: true,
              inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
              }
            },
            tooltip: {
              showDelay: 0,
              transitionDuration: 0.2,
              formatter: function (params) {
                var value = params.data.value || "no data"
//                    (params.value + '').split('.');
//                  value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.name + ': ' + value;
              }
            },
            visualMap: {
              left:40,
              bottom:80,
              min: min,
              max: max,
              calculable: true,
              inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
              }
            },
            series: [{
                type: 'map',
                map: 'africa',
                data: data.data,
            }]
          })
        }));
      },

    methods:{
      testFunc(name,key)
      {
          axios.get('../src/static/' + name + '.json')
            .then(
              function (response) {
                let min = readJson(response.data).sort().reverse()[0];
                let max = readJson(response.data).sort()[0];
                let mapChart = echarts.init(document.getElementById('mychart'));
                mapChart.setOption({
                  visualMap: {
                    min: min,
                    max: max,
                  },
                  tooltip: {
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                      var value = params.data.value || "no data"
//                    (params.value + '').split('.');
//                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
//                    return params.name + ': ' + value;
                      return params.name + ': ' + value
                    }
                  },
                  series: [{
                    data: response.data,}]
                })
              })
        this.category = key;
      }
    }
  }
</script>

<style lang="less">
  @darkbluel:#1f375b;
  @bggrey:#F7F7F7;
  @bgwhite:#FFFFFF;
  @height:700px;

  body{
    margin: 0;
    background:@bggrey;
  }
  .bodybox{
    width: 100%;
    height:@height;
  }
  .sandybox{
    display:flex;
    justify-content: center;
  }
  .bar{
    position: fixed;
    width: 100%;
    height: 60px;
    background: @darkbluel;
    z-index: 10;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,.4);
  }
  .container{
    background: @bgwhite;
    width: 70%;
    height: @height;
    display: flex;
  }
  .mapa{
    margin-top: 30px;
    padding-left: 150px;
    width: 500px;
    display: flex;
  }
  #mychart{
    width: 500px;
    height: @height;
    display: flex;
    justify-content: center;
  }
  .nav{
    padding-top:300px;
    z-index:1;
    background: dimgray;
  }
  button{
    color: #dfdfdf;
    font-size: 16px;
    width: 200px;
    text-align: center;
    height:50px;
    border-radius: 8px;
    border:0px;
    cursor: pointer;
    outline:none;
    background: transparent;
  }

  #shadow{
    width: 200px;
    height:50px;
    background: darkgray;
    position: absolute;
    transition: all .3s;
    z-index: -1;
  }
  .active{
    transition: 0.5s;
    color:@bgwhite;
  }
</style>
