<script setup>
import { ref, watch } from 'vue';
import ActionEngine from './ActionEngine.vue';


const props = defineProps({
  settings: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const propsData = ref(props.modelValue);

watch(() => propsData.value, (value) => {
  emit('update:modelValue', value);
}, {
  deep: true
});
</script>

<template>
  <div>
    <div v-for="settingsItem in settings" :key="settingsItem.propsKey">
      <div class="attribute-config__block__title">{{ settingsItem.title }}</div>

      <div class="attribute-config__action">
        <ActionEngine v-model="propsData[settingsItem.name]"></ActionEngine>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attribute-config__block__title {
  font-size: 14px;
  background-color: hsla(210, 8%, 95%, .4);
  color: #171a1d;
  border-top: 1px solid rgba(31, 56, 88, 0.1);
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
  padding: 6px 12px;
  font-weight: 500;
}

.attribute-config__action {
  padding: 10px;
}
</style>