import BaseMateriel from './BaseMateriel';


export default class BaseImage extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      url: 'http://img.chenbz.com/a_test/zwt16x9.png'  // 图片地址
    };
  }

  get defaultStyle() {
    return {
      display: 'block',
      width: '100%'
    };
  }

  get materielType() {
    return 'BaseImage';
  }

  get title() {
    return '图片';
  }

  get group() {
    return '基础';
  }

  get attributeSettings() {
    return [
      {
        title: '控件属性',
        type: 'block',
        children: [
          {
            title: '图片地址',
            type: 'textarea',
            propsKey: 'url'
          }
        ]
      }
    ];
  }

  get eventSettings() {
    return [
      {
        name: 'onMounted',
        title: '组件加载完成',
        desc: ''
      },
      {
        name: 'onClick',
        title: '点击组件',
        desc: ''
      }
    ];
  }
}