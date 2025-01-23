import BaseMateriel from './BaseMateriel';


export default class ExhibitionRollingNotification extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      text: '永远相信 美好的事情即将发生',  // 文本内容
      showLeftIcon: true,  // 是否显示左侧图标
      rolling: true,  // 是否滚动
      allowClose: false,  // 是否允许关闭
      rollingSpeed: 60,  // 滚动速度
      backgroundColor: '#fffbe8',  // 背景颜色
      textColor: '#ed6a0c'  // 文本颜色
    };
  }

  get materielType() {
    return 'ExhibitionRollingNotification';
  }

  get title() {
    return '滚动通知';
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
            title: '文本内容',
            type: 'textarea',
            propsKey: 'text'
          },
          {
            title: '是否显示左侧图标',
            type: 'switch',
            propsKey: 'showLeftIcon'
          },
          {
            title: '是否滚动',
            type: 'switch',
            propsKey: 'rolling'
          },
          {
            title: '是否允许关闭',
            type: 'switch',
            propsKey: 'allowClose'
          },
          {
            title: '滚动速度',
            type: 'number',
            propsKey: 'rollingSpeed',
            min: 1,
            max: 1000,
            step: 1
          },
          {
            title: '背景颜色',
            type: 'color',
            propsKey: 'backgroundColor'
          },
          {
            title: '文本颜色',
            type: 'color',
            propsKey: 'textColor'
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