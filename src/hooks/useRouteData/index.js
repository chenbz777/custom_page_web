import { ref } from 'vue';

const navigationType = ref('default');

export default function () {
  return {
    navigationType
  };
}