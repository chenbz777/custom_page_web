import BaseMateriel from './BaseMateriel';


export default class BaseButton extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      text: '按钮'  // 按钮文字
    };
  }

  get defaultStyle() {
    return {
      display: 'inline-block',
      fontSize: '14px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingTop: '8px',
      paddingBottom: '8px',
      borderRadius: '6px',
      backgroundColor: '#3095fa',
      color: '#ffffff',
      textAlign: 'center'
    };
  }

  get materielType() {
    return 'BaseButton';
  }

  get title() {
    return '按钮';
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
            title: '按钮文字',
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