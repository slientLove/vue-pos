
<template>
  <div class="pos">
     <div >       <!-- 用这个组件，会产生虚拟DOM，所以不能设置高度,需要用js设置高度 -->
       <el-row class="wrap">
           <el-col :span="8">
             <div class="grid-content bg-purple">
               <el-tabs>
                 <el-tab-pane label="点餐">
                   <el-table :data="tableData" border  style="width: 100%" class="content">
                     <el-table-column prop="goodsName" label="商品名称" width="100">
                     </el-table-column>
                     <el-table-column prop="count" label="数量" width="70">
                     </el-table-column>
                     <el-table-column prop="price" label="价格" width="80">
                     </el-table-column>
                     <el-table-column fixed="right" label="操作" width="100">
                       <template scope="scope">
                         <el-button type="text" size="small" @click="delProduct(scope.row)">删除</el-button>
                          <!--在此处传值时需要传入 (scope.row)-->
                         <el-button type="text" size="small" @click="addlistCount(scope.row)">增加</el-button>
                       </template>
                     </el-table-column>
                   </el-table>
                   <div class="totall" >
                       <span>数量：{{totallCount}}</span>
                       <span>总金额: ￥{{totallMoney}}元</span>
                   </div>
                   <div class="btn">
                     <el-button type="warning" @click="payMoney">结账</el-button>
                     <el-button type="success">挂单</el-button>
                     <el-button type="danger" @click="delAll">删除</el-button>
                   </div>
                 </el-tab-pane>
                 <el-tab-pane label="外卖">外卖</el-tab-pane>
                 <el-tab-pane label="挂单">挂单</el-tab-pane>
               </el-tabs>
             </div>
           </el-col>
           <el-col :span="16">
             <div class="grid-content bg-purple-light">
               <div class="often-goods">
                 <div class="title">常用商品</div>
                 <ul>
                   <li v-for="items in oftenGoods" @click="addlistCount(items)">
                     <span>{{items.goodsName}}</span>
                     <span class="o-price">￥{{items.price}}</span>
                   </li>
                 </ul>
               </div>
               <div class="goods-type">
                 <el-tabs>
                   <el-tab-pane label="小吃">
                      <ul class="cookList">
                         <!--利用循环语句进行输出 -->
                         <li v-for="item in type0Goods" @click="addlistCount(item)">
                           <div class="left">
                             <img :src="item.goodsImg" width="100%">
                           </div>
                           <div class="food-right">
                             <span class="foodName">{{item.goodsName}}</span>
                             <span class="foodPrice">￥{{item.price}}元</span>
                           </div>
                         </li>
                      </ul>
                   </el-tab-pane>
                   <el-tab-pane label="饮料">
                     <ul class="cookList">
                       <!-- 利用循环语句进行输出 -->
                       <li v-for="item in type1Goods" @click="addlistCount(item)">
                         <div class="left">
                           <img :src="item.goodsImg" width="100%">
                         </div>
                         <div class="food-right">
                           <span class="foodName">{{item.goodsName}}</span>
                           <span class="foodPrice">￥{{item.price}}元</span>
                         </div>
                       </li>
                     </ul>
                   </el-tab-pane>
                   <el-tab-pane label="外卖">
                     <ul class="cookList">
                       <!-- 利用循环语句进行输出 -->
                       <li v-for="item in type2Goods" @click="addlistCount(item)">
                         <div class="left">
                           <img :src="item.goodsImg" width="100%">
                         </div>
                         <div class="food-right">
                           <span class="foodName">{{item.goodsName}}</span>
                           <span class="foodPrice">￥{{item.price}}元</span>
                         </div>
                       </li>
                     </ul>
                   </el-tab-pane>
                   <el-tab-pane label="甜品">
                     <ul class="cookList">
                       <!-- 利用循环语句进行输出 -->
                       <li v-for="item in type3Goods" @click="addlistCount(item)">
                         <div class="left">
                           <img :src="item.goodsImg" width="100%">
                         </div>
                         <div class="food-right">
                           <span class="foodName">{{item.goodsName}}</span>
                           <span class="foodPrice">￥{{item.price}}元</span>
                         </div>
                       </li>
                     </ul>
                   </el-tab-pane>
                 </el-tabs>
               </div>
             </div>
           </el-col>
       </el-row>
     </div>
  </div>
</template>
<script>
  import axios from 'axios'      // 从远程读取数据
  export default {
    name: 'pos',
    data () {
      return {
        totallMoney: 0,
        totallCount: 0,
        tableData: [],
        oftenGoods: [],
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
      }
    },
    mounted () {
      var oEle = document.getElementById('order-list');
      oEle.style.height = document.body.clientHeight+'px';    // 根据内容设置高度
    },
    methods: {
        // 添加订单列表的方法
        addlistCount (goods) {        // 经当前商品传入进去
           this.totallMoney = 0;      // 先将数据清空
           this.totallCount = 0;
           let hasProduct = false;    // 判断该商品是否已经存在于列表中
          for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].goodsId==goods.goodsId){
                hasProduct = true;     // 如果相等，则表明该商品已经存在
              }
          }
          if(hasProduct){
            let arr = this.tableData.filter(o => o.goodsId==goods.goodsId);
            arr[0].count++;       // 筛选出已经存在的商品，并将数量相加
          }else{
            let newPro = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
            this.tableData.push(newPro);  // 如果没有商品，则将商品添加进去
            console.log(this.tableData);
          }
          this.getAllmoney();
        },
        delProduct (goods) {
          // 筛选出不是当前的数据，即是删除当前数据
          this.tableData = this.tableData.filter(o => o.goodsId!=goods.goodsId);
          this.getAllmoney();  // 再删除数据后，再进行金额的重新计算
        },
        getAllmoney () {
           // 计算商品总金额
           this.totallCount = 0;
           this.totallMoney = 0;
           if(this.tableData){
             this.tableData.forEach(value => {
               this.totallCount+=value.count;
               this.totallMoney+= (value.price*value.count);
             })
           }
        },
        delAll () {
          this.totallCount = 0;    // 删除所有数据，即是清空所有数据
          this.totallMoney = 0;
          this.tableData = [];
        },
        payMoney () {
           if(this.totallCount){    // 首先判断是否有商品
             this.tableData=[];
             this.totallMoney='';
             this.totallCount='';
             this.$message({
               message: "恭喜，您付款成功！",
               type: 'success'
             })
           }else{
             this.$message({
               message:'您好，请先选购商品再进行结账',
               type: 'error'
             })
           }
        }
    },
    created () {
      axios.get("http://jspang.com/DemoApi/oftenGoods.php").then(response => {
        console.log(response);
        this.oftenGoods = response.data;
      }).catch(error => {
        console.log(error);
        alert("网络错误");
      })
      axios.get("http://jspang.com/DemoApi/typeGoods.php").then(response => {
        console.log(response);
        // 对商品进行分类
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
    }
  }
</script>
<style>
  .btn{ margin-top: 10px;}
  .wrap{ width:100%;position: absolute;left: 6%;top: 0;text-align: center }
  .title{ height:41px;line-height: 42px;text-align: left;font-size: 14px;border-bottom:1px solid #D3DCE6;}
  .often-goods{ border-left: solid #ccc 1px;}
  .often-goods ul li{ float: left; border:1px solid #E5E9F2;padding: 10px;margin: 16px 5px;background-color: #fff;}
  .o-price{  color:#58B7FF;  }
  .goods-type{ display: block;position: absolute;bottom: -100px;}
  .cookList li{
    width:25%;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    display: flex;
    justify-content: flex-start;
  }
  .cookList li span{
     display: block;
   }
  .foodImg{
    width: 30%;
  }
  .food-right{
    width:500px;
  }
  .foodName{
    font-size: 16px;
    padding-left: 10px;
    color:brown;

  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }
  .totall{ margin: 20px 10px;border-bottom: solid #ccc 1px;padding: 10px;}
  .totall span{ line-height: 30px;display: inline-block;height: 30px;margin: 6px;}
</style>

