import BaseMateriel from './BaseMateriel';


export default class AdvancedGaoDeMap extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      map: {
        longitude: '116.40',  // 经度
        latitude: '39.91',  // 纬度
        name: '北京',  // 名称
        address: '北京市'  // 地址
      },
      showName: true,  // 显示地点名称
      showAddress: true  // 显示地址
      // openGuide: true  // 开启导航指引
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
          }
          // {
          //   title: '开启导航指引',
          //   type: 'switch',
          //   propsKey: 'openGuide'
          // }
        ]
      }
    ];
  }
}