import BaseMateriel from './BaseMateriel';


export default class AssistanceDivider extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      text: '',  // 文本内容
      textPosition: 'center',  // 文本位置
      isDashed: false  // 虚线
    };
  }

  get materielType() {
    return 'AssistanceDivider';
  }

  get title() {
    return '分割线';
  }

  get group() {
    return '辅助';
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
          },
          {
            title: '文本位置',
            type: 'select',
            propsKey: 'textPosition',
            options: [
              { label: '左', value: 'left' },
              { label: '中', value: 'center' },
              { label: '右', value: 'right' }
            ]
          },
          {
            title: '虚线',
            type: 'switch',
            propsKey: 'isDashed'
          }
        ]
      }
    ];
  }
}