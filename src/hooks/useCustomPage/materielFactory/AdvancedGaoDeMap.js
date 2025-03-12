import BaseMateriel from './BaseMateriel';


export default class AdvancedGaoDeMap extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      map: {
        longitude: '113.324521',  // 经度
        latitude: '23.106428',  // 纬度
        name: '广州塔',  // 名称
        address: '阅江西路222号',  // 地址
        pname: '广东省',  // 省份名称
        pcode: '440000',  // 省份编码
        cityname: '广州市',  // 城市名称
        citycode: '020',  // 城市编码
        adname: '海珠区',  // 区域名称
        adcode: '440105'  // 区域编码
      },
      showName: true,  // 显示地点名称
      showAddress: true,  // 显示地址
      openGuide: true  // 开启导航指引
    };
  }

  get materielType() {
    return 'AdvancedGaoDeMap';
  }

  get title() {
    return '地图-高德';
  }

  get group() {
    return '高级';
  }

  get attributeSettings() {
    return [
      {
        title: '控件属性',
        type: 'block',
        children: [
          {
            title: '高德地图定位',
            type: 'gaoDeMap',
            propsKey: 'map'
          },
          {
            title: '显示地点名称',
            type: 'switch',
            propsKey: 'showName'
          },
          {
            title: '显示地址',
            type: 'switch',
            propsKey: 'showAddress'
          },
          {
            title: '开启导航指引',
            type: 'switch',
            propsKey: 'openGuide'
          }
        ]
      }
    ];
  }
}