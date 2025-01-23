import random from '@/utils/random.js';


export default class BaseMateriel {

  constructor(instance) {

    // 组件类型
    this.type = this.materielType;

    // 随机字符串
    const randomStr = random.lowerCase();

    // 组件唯一标识
    const key = `${this.type}_${randomStr}`;

    // 组件唯一标识
    this.key = key;

    // 组件属性
    this.props = this.defaultProps;

    // 组件插槽
    this.slots = this.defaultSlots;

    // 组件样式
    this.style = this.defaultStyle;

    // 组件编辑态属性
    this.editProps = this.defaultEditProps;

    // 事件动作列表
    this.events = {};

    // 初始化事件动作列表
    this.eventSettings.forEach(event => {
      this.events[event.name] = [];
    });

    if (instance) {
      if (instance.type !== this.type) {
        throw new Error(`组件类型不匹配, 期望类型为: ${this.type}, 实际类型为: ${instance.type}`);
      }

      // 数据兼容处理, 合并最新的属性
      Object.assign(this.props, JSON.parse(JSON.stringify(instance.props || {})));

      // 数据兼容处理, 合并最新的插槽
      this.slots.forEach(slot => {
        if (instance.slots.find(item => item.name === slot.name)) {
          Object.assign(slot, JSON.parse(JSON.stringify(instance.slots.find(item => item.name === slot.name))));
        }
      });

      // 数据兼容处理, 合并最新的样式
      Object.assign(this.style, JSON.parse(JSON.stringify(instance.style || {})));

      // 数据兼容处理, 合并最新的编辑态属性
      Object.assign(this.editProps, JSON.parse(JSON.stringify(instance.editProps || {})));

      // 数据兼容处理, 合并最新的事件动作
      Object.assign(this.events, JSON.parse(JSON.stringify(instance.events || {})));
    }
  }

  get materielType() {
    return '';
  }

  // 组件属性
  get defaultProps() {
    return {};
  }

  // 组件插槽
  get defaultSlots() {
    return [];
  }

  // 默认编辑态值
  get defaultEditProps() {
    return {
      delete: true,
      copy: true,
      move: true
    };
  }

  // 定义children是方便大纲树的递归遍历
  get children() {
    return this.slots;
  }

  // 组件样式
  get defaultStyle() {
    return {};
  }

  // 组件中文名称
  get title() {
    return '';
  }

  // 组件描述
  get description() {
    return '';
  }

  // 组件文档链接
  get docUrl() {
    return '';
  }

  // 组件快照
  get snapshot() {
    return '';
  }

  // 组件的小图标
  get icon() {
    return '';
  }

  // 组件标签
  get tags() {
    return [];
  }

  // 组件关键词,用于搜索联想: 由组件名称、中文名称、描述、标签等组成
  get keyword() {
    return this.type + this.title + this.description + this.tags.join('');
  }

  // 当前组件所处的分组
  get group() {
    return '';
  }

  // 当前组件所处分组的排序
  get sort() {
    return 1;
  }

  // 组件属性设置
  get attributeSettings() {
    return [];
  }

  // 高级设置
  get advancedSettings() {
    return [];
  }

  // 事件设置
  get eventSettings() {
    return [];
  }

  // 编辑态设置
  get editSettings() {
    /**
     * 编辑态设置, 可以设置组件的编辑态属性, 例如: 是否可删除、是否可复制、是否可拖拽
     */
    return [
      {
        title: '可删除',
        type: 'switch',
        propsKey: 'delete'
      },
      {
        title: '可复制',
        type: 'switch',
        propsKey: 'copy'
      },
      {
        title: '可拖拽',
        type: 'switch',
        propsKey: 'move'
      }
    ];
  }
}