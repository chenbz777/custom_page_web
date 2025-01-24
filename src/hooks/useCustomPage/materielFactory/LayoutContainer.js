import BaseMateriel from './BaseMateriel';


export default class LayoutContainer extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get defaultProps() {
    return {
      gutter: 0,  // 列间距
      cols: [  // 列比例
        {
          span: 12,
          offset: 0,
          name: 'default'
        },
        {
          span: 12,
          offset: 0,
          name: 'container2'
        }
      ],
      justify: 'start'  // 对齐方式
    };
  }

  get materielType() {
    return 'LayoutContainer';
  }

  get defaultSlots() {
    return [
      {
        name: 'default',
        title: '默认插槽',
        allowComponents: [],
        denyComponents: [],
        children: []
      },
      {
        name: 'container2',
        title: '插槽2',
        allowComponents: [],
        denyComponents: [],
        children: []
      }
    ];
  }

  get title() {
    return '布局容器';
  }

  get group() {
    return '布局';
  }

  get attributeSettings() {
    return [
      {
        title: '控件属性',
        type: 'block',
        children: [
          {
            title: '对齐方式',
            type: 'select',
            propsKey: 'justify',
            options: [
              {
                value: 'start',
                label: '左对齐'
              },
              {
                value: 'center',
                label: '居中'
              },
              {
                value: 'end',
                label: '右对齐'
              },
              {
                value: 'space-around',
                label: '等间距'
              },
              {
                value: 'space-between',
                label: '两端对齐'
              },
              {
                value: 'space-evenly',
                label: '均匀分布'
              }
            ]
          },
          {
            title: '列间距',
            type: 'number',
            propsKey: 'gutter',
            min: 0
          },
          {
            title: '列比例',
            type: 'list',
            propsKey: 'cols',
            listKey: 'name',
            listSettings: [
              {
                title: '比例',
                itemKey: 'span',
                type: 'select',
                value: 12,
                options: [
                  {
                    label: '0',
                    value: 0
                  },
                  {
                    label: '1',
                    value: 1
                  },
                  {
                    label: '2',
                    value: 2
                  },
                  {
                    label: '3',
                    value: 3
                  },
                  {
                    label: '4',
                    value: 4
                  },
                  {
                    label: '5',
                    value: 5
                  },
                  {
                    label: '6',
                    value: 6
                  },
                  {
                    label: '7',
                    value: 7
                  },
                  {
                    label: '8',
                    value: 8
                  },
                  {
                    label: '9',
                    value: 9
                  },
                  {
                    label: '10',
                    value: 10
                  },
                  {
                    label: '11',
                    value: 11
                  },
                  {
                    label: '12',
                    value: 12
                  },
                  {
                    label: '13',
                    value: 13
                  },
                  {
                    label: '14',
                    value: 14
                  },
                  {
                    label: '15',
                    value: 15
                  },
                  {
                    label: '16',
                    value: 16
                  },
                  {
                    label: '17',
                    value: 17
                  },
                  {
                    label: '18',
                    value: 18
                  },
                  {
                    label: '19',
                    value: 19
                  },
                  {
                    label: '20',
                    value: 20
                  },
                  {
                    label: '21',
                    value: 21
                  },
                  {
                    label: '22',
                    value: 22
                  },
                  {
                    label: '23',
                    value: 23
                  },
                  {
                    label: '24',
                    value: 24
                  }
                ]
              },
              {
                title: '列偏移',
                itemKey: 'offset',
                type: 'select',
                value: 0,
                options: [
                  {
                    label: '0',
                    value: 0
                  },
                  {
                    label: '1',
                    value: 1
                  },
                  {
                    label: '2',
                    value: 2
                  },
                  {
                    label: '3',
                    value: 3
                  },
                  {
                    label: '4',
                    value: 4
                  },
                  {
                    label: '5',
                    value: 5
                  },
                  {
                    label: '6',
                    value: 6
                  },
                  {
                    label: '7',
                    value: 7
                  },
                  {
                    label: '8',
                    value: 8
                  },
                  {
                    label: '9',
                    value: 9
                  },
                  {
                    label: '10',
                    value: 10
                  },
                  {
                    label: '11',
                    value: 11
                  },
                  {
                    label: '12',
                    value: 12
                  },
                  {
                    label: '13',
                    value: 13
                  },
                  {
                    label: '14',
                    value: 14
                  },
                  {
                    label: '15',
                    value: 15
                  },
                  {
                    label: '16',
                    value: 16
                  },
                  {
                    label: '17',
                    value: 17
                  },
                  {
                    label: '18',
                    value: 18
                  },
                  {
                    label: '19',
                    value: 19
                  },
                  {
                    label: '20',
                    value: 20
                  },
                  {
                    label: '21',
                    value: 21
                  },
                  {
                    label: '22',
                    value: 22
                  },
                  {
                    label: '23',
                    value: 23
                  },
                  {
                    label: '24',
                    value: 24
                  }
                ]
              }
            ]
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