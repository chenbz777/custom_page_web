<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
});

function handleClick(data) {
  if (data.link) {
    // window.location.href = data.link;
    window.open(data.link);
  }
}
</script>

<template>
  <div class="exhibition-swipe">
    <van-swipe :autoplay="data.props.autoplayInterval * 1000" :loop="data.props.isLoop"
      :indicator-color="data.props.indicatorColor">
      <van-swipe-item v-for="item in data.props.list" :key="item.key">
        <img :src="item.url" alt="" class="exhibition-swipe__image" @click="handleClick(item)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
.exhibition-swipe__image {
  display: block;
  width: 100%;
}
</style>