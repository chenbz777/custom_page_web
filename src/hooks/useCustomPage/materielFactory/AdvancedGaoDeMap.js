import BaseMateriel from './BaseMateriel';


export default class AdvancedGaoDeMap extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      longitude: '116.40',  // 经度
      latitude: '39.91',  // 纬度
      address: '北京市'  // 地址
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
            title: '经度',
            type: 'input',
            propsKey: 'longitude'
          },
          {
            title: '纬度',
            type: 'input',
            propsKey: 'latitude'
          },
          {
            title: '地址',
            type: 'textarea',
            propsKey: 'address'
          }
        ]
      }
    ];
  }
}