<template>
   <div class="left-nav">
     <ul>
       <li>
           <i class="icon iconfont icon-daifukuan"></i>
           <span>收银</span>
       </li>
       <li>
           <i class="icon iconfont icon-31guanzhudianpu"></i>
           <span>店铺</span>
       </li>
       <li>
           <i class="icon iconfont icon-gouwucheman"></i>
           <span>购物车</span>
       </li>
       <li>
           <i class="icon iconfont icon-kefuyouxian"></i>
           <span>客户</span>
     </li>
       <li>
           <i class="icon iconfont icon-gongnengjianyi"></i>
           <span>设置</span>
       </li>
     </ul>
   </div>
</template>
<script>
  export default {
    name: 'nav',
    data () {
      return {

      }
    }
  }
</script>
<style>
   .left-nav{ color: #fff;font-size: 10px;height:100%;width:6%;background-color: #1D8ce0;}
     .iconfont{ font-size:24px;}
       .left-nav ul{ list-style: none;}
         .left-nav li{ text-align: center;border-bottom:1px solid #20a0ff;padding: 20px 0; }
            .left-nav li span{ display: block;text-align: center;margin-top: 5px;}
</style>
