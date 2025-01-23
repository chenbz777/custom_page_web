import BaseMateriel from './BaseMateriel';


export default class ExhibitionSwipe extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      autoplayInterval: 3,  // 自动播放间隔
      isLoop: true,  // 是否循环播放
      indicatorColor: '#fff',  // 指示器颜色
      list: [
        {
          url: 'http://img.chenbz.com/a_test/zwt16x9.png',
          link: '',
          key: '1'
        },
        {
          url: 'http://img.chenbz.com/a_test/zwt16x9.png',
          link: '',
          key: '2'
        },
        {
          url: 'http://img.chenbz.com/a_test/zwt16x9.png',
          link: '',
          key: '3'
        }
      ]
    };
  }

  get materielType() {
    return 'ExhibitionSwipe';
  }

  get title() {
    return '轮播图';
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
            title: '自动播放间隔(s)',
            type: 'number',
            propsKey: 'autoplayInterval',
            min: 0
          },
          {
            title: '是否循环播放',
            type: 'switch',
            propsKey: 'isLoop'
          },
          {
            title: '指示器颜色',
            type: 'color',
            propsKey: 'indicatorColor'
          },
          {
            title: '图片列表',
            type: 'list',
            propsKey: 'list',
            listKey: 'key',
            listSettings: [
              {
                title: '图片地址',
                type: 'textarea',
                itemKey: 'url',
                value: 'https://img.chenbz.com/a_test/zwt16x9.png'
              },
              {
                title: '跳转链接地址',
                type: 'textarea',
                itemKey: 'link',
                value: ''
              }
            ]
          }
        ]
      }
    ];
  }
}