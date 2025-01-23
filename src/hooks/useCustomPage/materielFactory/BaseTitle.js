import BaseMateriel from './BaseMateriel';


export default class BaseTitle extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      title: '标题',  // 标题内容
      lineColor: '#b3f64a'  // 线条颜色
    };
  }

  get defaultStyle() {
    return {
      fontSize: '16px',
      fontWeight: 600,
      color: '#303133'
    };
  }

  get materielType() {
    return 'BaseTitle';
  }

  get title() {
    return '标题';
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
            title: '标题内容',
            type: 'textarea',
            propsKey: 'title'
          },
          {
            title: '线条颜色',
            type: 'color',
            propsKey: 'lineColor'
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