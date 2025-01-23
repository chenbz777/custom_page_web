import BaseMateriel from './BaseMateriel';


export default class Page extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get materielType() {
    return 'Page';
  }

  get defaultSlots() {
    return [
      {
        name: 'head',
        title: '头部插槽',
        allowComponents: [],
        denyComponents: ['Page'],
        children: []
      },
      {
        name: 'default',
        title: '默认插槽',
        allowComponents: [],
        denyComponents: ['Page'],
        children: []
      },
      {
        name: 'foot',
        title: '底部插槽',
        allowComponents: [],
        denyComponents: ['Page'],
        children: []
      }
    ];
  }

  get defaultEditProps() {
    return {
      delete: false,
      copy: false,
      move: false
    };
  }

  get defaultStyle() {
    return {
      backgroundColor: '#ffffff'
    };
  }

  get title() {
    return '页面';
  }

  get group() {
    return '页面';
  }
}