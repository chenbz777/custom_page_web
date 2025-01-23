<script setup>
</script>

<template>
  <div class="phone">
    <img src="@/static/image/phone-model.png" alt="" class="phone__image" />
    <div class="phone__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.phone {
  position: relative;
  width: 365px;
}

.phone__image {
  display: block;
  width: 100%;
}

.phone__content {
  position: absolute;
  left: 20px;
  top: 66px;
  z-index: 2;
  width: calc(100% - (20px * 2));
  height: calc(100% - 66px - 18px);
  border-radius: 0 0 40px 40px;
  overflow-y: hidden;
  overflow-y: auto;
}
</style>