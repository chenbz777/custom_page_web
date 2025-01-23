import BaseMateriel from './BaseMateriel';


export default class BaseText extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      text: '文本'  // 文本内容
    };
  }

  get materielType() {
    return 'BaseText';
  }

  get title() {
    return '文本';
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
            title: '文本内容',
            type: 'textarea',
            propsKey: 'text'
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