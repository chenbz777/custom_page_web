import BaseMateriel from './BaseMateriel';


export default class AssistanceBlock extends BaseMateriel {

  constructor(instance) {
    super(instance);
  }

  get materielType() {
    return 'AssistanceBlock';
  }

  get title() {
    return '空白块';
  }

  get group() {
    return '辅助';
  }

  get defaultStyle() {
    return {
      height: '20px'
    };
  }
}