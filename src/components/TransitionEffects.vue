<script setup>
import { nextTick } from 'vue';
import useAnimate from '@/hooks/useAnimate';
import random from '@/utils/random';


const props = defineProps({
  animateName: {
    required: false,
    type: String,
    default: 'animate__fadeInUp'
  }
});

const { animateElement } = useAnimate();

const id = random.lowerCase();

const io = new IntersectionObserver((entires, owner) => {
  entires.forEach(entry => {
    // console.log(`阈值比例: ${entry.intersectionRatio}, 元素:`, entry.target);
    if (entry.isIntersecting) {
      // console.log('元素已进入视窗，并且超过50%可见');
      entry.target.classList.add('transition-effects--show');
      animateElement(`#${id}`, props.animateName);

      // 将该元素停止监听
      io.unobserve(entry.target);
    }
  });
}, {
  threshold: [0.25]
});

nextTick(() => {
  io.observe(document.getElementById(id));
});
</script>

<template>
  <div :id="id" class="transition-effects animate__animated">
    <slot></slot>
  </div>
</template>

<style scoped>
.transition-effects {
  opacity: 0;
  animation-duration: 0.35s;
}

.transition-effects--show {
  opacity: 1;
}
</style>