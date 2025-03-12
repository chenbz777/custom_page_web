<script setup>
import useGaoDeMap from '@/hooks/useGaoDeMap';
import userDefined from '@/utils/userDefined';


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const { key } = useGaoDeMap();

// 前往导航
function goGuide() {
  const { longitude, latitude, name, address } = props.data;

  userDefined.navigateToMap({
    longitude,
    latitude,
    name,
    address
  });
}
</script>

<template>
  <div class="advanced-gao-de-map">
    <template v-if="key">
      <div class="advanced-gao-de-map__info">
        <div class="advanced-gao-de-map__info__content">
          <div class="advanced-gao-de-map__name" v-if="data.props.map.name && data.props.showName">
            {{ data.props.map.name }}
          </div>

          <div class="advanced-gao-de-map__address" v-if="data.props.map.address && data.props.showAddress">
            {{ data.props.map.address }}
          </div>
        </div>

        <div class="advanced-gao-de-map__info__btn" @click="goGuide()" v-if="data.props.openGuide">
          点击前往导航
        </div>
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
.advanced-gao-de-map__info {
  display: flex;
  align-items: center;
}

.advanced-gao-de-map__info__content {
  flex: 1;
  width: 0;
}

.advanced-gao-de-map__info__btn {
  margin-left: 12px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #409eff;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}

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