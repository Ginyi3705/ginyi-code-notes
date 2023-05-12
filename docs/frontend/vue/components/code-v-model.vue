<template>
  <div>简单的数据类型（数值，布尔） {{ value1 }}</div>
  <div>复杂的数据类型（数据，对象） {{ value2 }}</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
export default defineComponent({
  name: 'child',
  setup() {
    const value1 = ref<string>('字符串')
    const value2 = reactive<object>({
      name: '张三',
      age: 20
    })
    return {
      value1,
      value2
    }
  }
})
</script>