import BaseMateriel from './BaseMateriel';


export default class ExhibitionRichText extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      content: '展示内容'  // 展示内容
    };
  }

  get materielType() {
    return 'ExhibitionRichText';
  }

  get title() {
    return '图文展示';
  }

  get group() {
    return '展示';
  }

  get attributeSettings() {
    return [
      {
        title: '控件属性',
        type: 'block',
        children: [
          {
            title: '展示内容',
            type: 'richText',
            propsKey: 'content'
          }
        ]
      }
    ];
  }
}