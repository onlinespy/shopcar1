<template>
  <div class="app">
    <h2>综合案例-购物清单</h2>
    <!-- v-for 遍历商品列表【6.3.3 内置指令】 -->
    <div class="goods-list">
      <GoodsItem
        v-for="item in goodsList"
        :key="item.id"
        :goods="item"
        @change-count="handleChangeCount"
      >
        <!-- 插槽：⽗组件向⼦组件传⼊图标-->
        <img :src="item.icon" alt="书籍封⾯" />
      </GoodsItem>
    </div>
    <!-- 空列表提示：v-if / v-else -->
    <div v-if="goodsList.length === 0" class="empty">购物⻋是空的～</div>
    <!-- 计算属性：总价【6.3.4】 -->
    <div class="total-bar">
      <div class="total-info">
        <span>共{{ totalCount }} 件商品</span>
        <span class="total-price">合计：¥{{ totalPrice.toFixed(2) }}</span>
      </div>
      <button class="submit-btn" @click="showModal = true">提交订单</button>
    </div>
    <OrderModal
      :visible="showModal"
      :total-count="totalCount"
      :total-price="totalPrice"
      @cancel="showModal = false"
      @confirm="handleSubmit"
    />
    <!-- 提交成功提示-->
    <div v-if="submitted" class="success-tip">订单提交成功！总价：{{ totalPrice }}</div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import GoodsItem from './components/GoodsItem.vue'
import OrderModal from './components/OrderModal.vue'
import vueIcon from '@/assets/images/vue-book.png'
import jsIcon from '@/assets/images/js-book.png'
import cssIcon from '@/assets/images/css-book.png'
// 商品列表数据
const goodsList = ref([
  { id: 1, name: 'Vue3 实战教程', price: 89.0, count: 1, icon: vueIcon },
  { id: 2, name: 'JavaScript ⾼级程序设计', price: 128.0, count: 1, icon: jsIcon },
  { id: 3, name: 'CSS 世界', price: 59.0, count: 2, icon: cssIcon },
])
const showModal = ref(false)
const submitted = ref(false)
//【6.3.4】计算属性：总数量
const totalCount = computed(() => {
  return goodsList.value.reduce((sum, item) => sum + item.count, 0)
})
//【6.3.4】计算属性：总价
const totalPrice = computed(() => {
  return goodsList.value.reduce((sum, item) => sum + item.price * item.count, 0)
})
//【6.3.4】侦听器：监听总价变化，超过500元时提示
watch(totalPrice, (newVal) => {
  if (newVal > 500) {
    alert('订单⾦额超过500元，触发⼤额订单提醒')
  }
})
//【6.3.5】组件通信：⼦组件emit事件，修改⽗组件数据
const handleChangeCount = (id, delta) => {
  const item = goodsList.value.find((g) => g.id === id)
  if (item) {
    item.count = Math.max(0, item.count + delta)
  }
  submitted.value = false
}
// 提交订单
const handleSubmit = () => {
  showModal.value = false
  submitted.value = true
}
</script>
<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
h2 {
  text-align: center;
}
.goods-list {
  margin-bottom: 20px;
}
.icon {
  font-size: 28px;
  margin-right: 12px;
}
.empty {
  text-align: center;
  color: #999;
  padding: 40px 0;
}
.total-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  position: sticky;
  bottom: 10px;
}
.total-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #e53935;
}
.submit-btn {
  padding: 12px 32px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
}
.success-tip {
  margin-top: 16px;
  padding: 12px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 6px;
  text-align: center;
}
</style>
