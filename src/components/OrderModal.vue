<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-mask" @click.self="$emit('cancel')">
      <div class="modal-box">
        <h3>确认订单</h3>
        <div class="order-info">
          <p>商品数量：{{ totalCount }} 件</p>
          <p>
            应付金额：<strong class="amount">¥{{ totalPrice.toFixed(2) }}</strong>
          </p>
          <input
            v-focus
            type="text"
            placeholder="请填写订单备注"
            style="width: 100%; margin-top: 10px; padding: 8px; box-sizing: border-box"
          />
        </div>
        <div class="modal-btns">
          <button class="btn-cancel" @click="$emit('cancel')">取消</button>
          <button class="btn-confirm" @click="$emit('confirm')">确认提交</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: Boolean,
  totalCount: Number,
  totalPrice: Number,
})
defineEmits(['cancel', 'confirm'])
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-box {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 360px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.modal-box h3 {
  margin: 0 0 16px 0;
  text-align: center;
}
.order-info {
  margin-bottom: 20px;
  font-size: 15px;
}
.amount {
  color: #e53935;
  font-size: 18px;
}
.modal-btns {
  display: flex;
  gap: 12px;
}
.modal-btns button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.btn-cancel {
  background: #f0f0f0;
}
.btn-confirm {
  background: #e53935;
  color: #fff;
}
</style>
