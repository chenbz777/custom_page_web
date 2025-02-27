<script setup>
import useGaoDeMap from '@/hooks/useGaoDeMap';


defineProps({
  data: {
    type: Object,
    required: true
  }
});

const { key } = useGaoDeMap();
</script>

<template>
  <div class="advanced-gao-de-map">
    <template v-if="key">
      <div class="advanced-gao-de-map__name" v-if="data.props.map.name && data.props.showName">
        {{ data.props.map.name }}
      </div>

      <div class="advanced-gao-de-map__address" v-if="data.props.map.address && data.props.showAddress">
        {{ data.props.map.address }}
      </div>

      <img
        :src="`https://restapi.amap.com/v3/staticmap?key=${key}&location=${data.props.map.longitude},${data.props.map.latitude}&zoom=14&markers=mid,,A:${data.props.map.longitude},${data.props.map.latitude}`"
        alt="高德地图" class="advanced-gao-de-map__image" />
    </template>

    <template v-else>
      请配置高德地图 key
    </template>
  </div>
</template>

<style scoped>
.advanced-gao-de-map__name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.advanced-gao-de-map__address {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
}

.advanced-gao-de-map__image {
  display: block;
  width: 100%;
}
</style>