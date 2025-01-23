import BaseMateriel from './BaseMateriel';


export default class AdvancedWebview extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      url: 'https://www.baidu.com',  // 地址
      width: '100%',  // 宽度
      height: '300px'  // 高度
    };
  }

  get materielType() {
    return 'AdvancedWebview';
  }

  get title() {
    return '网页嵌入';
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
            title: '网页地址',
            type: 'textarea',
            propsKey: 'url'
          },
          {
            title: '宽度',
            type: 'input',
            propsKey: 'width'
          },
          {
            title: '高度',
            type: 'input',
            propsKey: 'height'
          }
        ]
      }
    ];
  }
}