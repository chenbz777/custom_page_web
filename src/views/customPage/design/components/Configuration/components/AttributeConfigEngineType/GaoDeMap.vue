<script setup>
import { ref } from 'vue';
import axios from 'axios';
import useGaoDeMap from '@/hooks/useGaoDeMap';


const props = defineProps({
  modelValue: {
    required: true,
    type: Object
  }
});

const emit = defineEmits(['update:modelValue']);

const { key } = useGaoDeMap();

const dialogVisible = ref(false);

// 搜索地址
const searchText = ref('');

// 地址列表
const addressList = ref([]);

// 静态地图
const staticMap = ref('');

const mapData = ref({});

// 搜索地址
function searchAddress() {
  axios.get('https://restapi.amap.com/v5/place/text', {
    params: {
      key,
      keywords: searchText.value
    }
  }).then(res => {
    addressList.value = res.data.pois;
  });
}

function clickAddress(data) {

  const { location, name, address } = data;

  const coordinates = location.split(',');

  const longitude = coordinates[0];  // 经度
  const latitude = coordinates[1];   // 纬度

  getStaticMap({
    name,
    address,
    longitude,
    latitude
  });
}

// 获取静态地图
function getStaticMap(data) {
  const { longitude, latitude, name, address } = data;

  const location = `${longitude},${latitude}`;

  mapData.value = {
    name,
    address,
    longitude,
    latitude
  };

  staticMap.value = `https://restapi.amap.com/v3/staticmap?key=${key}&location=${location}&zoom=14&markers=mid,,A:${location}`;
}

// 打开地图定位
function openMap() {
  dialogVisible.value = true;

  getStaticMap(props.modelValue);
}

// 确定定位
function confirmMap() {
  dialogVisible.value = false;

  emit('update:modelValue', JSON.parse(JSON.stringify(mapData.value)));
}
</script>

<template>
  <div>
    <el-button type="primary" @click="openMap()">打开地图定位</el-button>

    <el-dialog v-model="dialogVisible" title="地图定位" width="700">
      <template v-if="key">
        <div class="gao-de-map">
          <div class="gao-de-map__left">
            <div class="gao-de-map__search">
              <el-input v-model="searchText" placeholder="搜索地址" clearable class="gao-de-map__search__input" />
              <el-button type="primary" @click="searchAddress()">搜索</el-button>
            </div>
            <div class="gao-de-map__list">
              <div class="gao-de-map__item" v-for="item in addressList" :key="item.id" @click="clickAddress(item)">
                <div class="gao-de-map__item__name">
                  {{ item.name }}
                </div>
                <div class="gao-de-map__item__address">
                  {{ item.address }}
                </div>
              </div>
            </div>
          </div>

          <div class="gao-de-map__map" v-if="staticMap">
            <img :src="staticMap" alt="" class="gao-de-map__map__image" />
          </div>
        </div>
      </template>

      <template v-else>
        请配置高德地图 key
      </template>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="confirmMap()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.gao-de-map {
  display: flex;
  height: 500px;
  padding: 10px;
}

.gao-de-map__left {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.gao-de-map__list {
  flex: 1;
  height: 0;
  overflow-y: auto;
}

.gao-de-map__list:empty::after {
  content: '暂无数据, 请搜索地址';
  display: block;
  text-align: center;
  padding: 30px 0;
  color: #666666;
}

.gao-de-map__map {
  width: 300px;
  height: 100%;
  margin-left: 10px;
  background-color: #f0f0f0;
}

.gao-de-map__map__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gao-de-map__search {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.gao-de-map__search__input {
  flex: 1;
  width: 0;
  margin-right: 10px;
}

.gao-de-map__item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.gao-de-map__item__name {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.gao-de-map__item__address {
  font-size: 12px;
  color: #666666;
  margin-top: 2px;
}
</style>