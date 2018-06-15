import Vue from 'vue'
import Analysis from '../components/Analysis.vue'
import Result from '../components/Result.vue'
import Result2D from '../components/Result2D.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {path:'/analysis',component:Analysis},
    {path:'/result',component:Result},
    {path:'/result2d',component:Result2D},
    {path:'*',redirect:'/result2d'},
  ],
});

