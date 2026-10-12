<template>
  <div class="goods-item">
    <!-- 匿名插槽：⽗组件传⼊商品图标/图⽚-->
    <slot></slot>
    <div class="goods-info">
      <h4>{{ goods.name }}</h4>
      <p class="price">单价：¥{{ goods.price.toFixed(2) }}</p>
    </div>
    <div class="goods-count">
      <button @click="$emit('change-count', goods.id, -1)" :disabled="goods.count <= 0">-</button>
      <span>{{ goods.count }}</span>
      <button @click="$emit('change-count', goods.id, 1)">+</button>
    </div>
    <div class="subtotal">⼩计：¥{{ (goods.price * goods.count).toFixed(2) }}</div>
  </div>
</template>
<script setup>
defineProps({
  goods: {
    type: Object,
    required: true,
  },
})
defineEmits(['change-count'])
</script>
<style scoped>
.goods-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #fff;
}
.goods-info h4 {
  margin: 0 0 4px 0;
}
.price {
  color: #e53935;
  margin: 0;
}
.goods-count {
  display: flex;
  align-items: center;
  gap: 8px;
}
.goods-count button {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}
.goods-count button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.subtotal {
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}
</style>
