// ⾃定义指令v-focus：挂载时⾃动聚焦输⼊框
export const vFocus = {
  mounted(el) {
    el.focus()
  },
}
