<template>
  <div class="container">
    <div id="mychart">
      result
    </div>
  </div>
</template>

<script>

  let echarts = require('echarts')
  let axios = require('axios')
  require('echarts-gl')

  export default {
    name: 'app',
    data () {
      return {
        mapdata: ''
      }
    },
    mounted(){
      axios
        .get('../src/static/africa.json')
        .then(
          function (response){

            var mapChart = echarts.init(document.getElementById('mychart'))
            mapChart.hideLoading();
            echarts.registerMap('africa',response.data);
            var option = {
              backgroundColor: '#cdcfd5',
              title:{
                text:'test'
              },
              mapLocation:{
                x:400,
                y:600,
                width:'50%',
                height:'100%',
              },
              tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function (params) {
                  var value = (params.value + '').split('.');
                  //再改
                  value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                  return params.seriesName + '<br/>' + params.name + ': ' + value;
                }
              },
              series:[
                {
                  type:'map3D',
                  map:'africa',
                  boxWidth:50,
                  boxHeight:60,
                  boxDepth:'auto',
                  regionHeight:0,
                  shading: 'realistic',
                  light:{
                    main:{
                      intensity:5,
                      shadow:true,
                      shadowQuality:'high',
                      alpha:30
                    },
                    ambient:{
                      intensity:0
                    },
                    ambientCubemap:{
                      exposure:1,
                      diffuseIntensity:0.5
                    },
                  },
                  data:[
                    {name:'Libya',value:5,height:0.3}
                  ],

                }
              ],
//                visualMap:{
//                  min:10,
//                  max:100,
//                  text:['High','Low'],
//                  realtime:true,
//                  calculable:true,
//                  inRange:{
//                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
//                  },
//                },
              emphasis:{label:{show:true}},

            }
            mapChart.setOption(option)
          }
        )
    },
    methods:{
    },
  }

</script>

<style>
  .container{
    display: flex;
    justify-content: center;

  }
  #mychart{
    width: 600px;
    height: 500px;
    display: flex;
  }
</style>
