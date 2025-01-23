import TextFormat from '@/common/TextFormat';
import date from '@/utils/date';

class FormItemProps {

  constructor(props = {}) {
    Object.assign(this, this.getBaseProps(), this.getProps(), props);
  }

  getBaseProps() {
    return {
      style: {}
    };
  }

  getProps() {
    return {};
  }

  getDefaultValue() {
    return '';
  }

  getRules() {
    return [
      {
        required: true,
        message: this.placeholder,
        trigger: 'change'
      }
    ];
  }

  getText(value) {
    return value;
  }
}

class FormInput extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请输入',
      disabled: false,
      prefix: '',
      suffix: '',
      maxLength: 600,
      showLimit: true,
      clearable: true,
      textFormat: '不限制'
    };
  }

  getRules() {
    return [
      {
        required: true,
        message: this.placeholder,
        trigger: 'blur'
      },
      {
        validator: (rule, value, callback) => {
          if (!TextFormat.verify(this.textFormat, value)) {
            return callback(new Error(`格式不正确, 期望格式为: ${this.textFormat}`));
          }

          callback();
        },
        trigger: 'blur'
      }
    ];
  }
}

class FormTextarea extends FormInput {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请输入',
      disabled: false,
      maxLength: 600,
      minRows: 4,
      maxRows: 6,
      showLimit: true,
      clearable: true,
      textFormat: '不限制'
    };
  }
}

class FormNumber extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请输入',
      disabled: false,
      min: 0,
      max: 999999999,
      controlsPosition: 'right',
      prefix: '',
      suffix: '',
      precision: 0
    };
  }

  getDefaultValue() {
    return 0;
  }
}

class FormSwitch extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      disabled: false
    };
  }

  getDefaultValue() {
    return false;
  }

  getText(value) {
    return value ? '是' : '否';
  }
}

class FormTime extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true
    };
  }

  getDefaultValue() {
    return date.getTime();
  }
}

class FormTimeToTime extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      rangeSeparator: '至'
    };
  }

  getDefaultValue() {
    return [date.getTime(), date.getTime()];
  }

  getText(value = []) {
    return value.join(' 至 ');
  }
}

class FormDate extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true
    };
  }

  getDefaultValue() {
    return date.getDate();
  }
}

class FormDateToDate extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      rangeSeparator: '至'
    };
  }

  getDefaultValue() {
    return [date.getDate(), date.getDate()];
  }

  getText(value = []) {
    return value.join(' 至 ');
  }
}

class FormDateTime extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true
    };
  }

  getDefaultValue() {
    return date.getDateTime();
  }
}

class FormDateTimeToDateTime extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      clearable: true,
      startPlaceholder: '开始日期时间',
      endPlaceholder: '结束日期时间',
      rangeSeparator: '至'
    };
  }

  getDefaultValue() {
    return [date.getDateTime(), date.getDateTime()];
  }

  getText(value = []) {
    return value.join(' 至 ');
  }
}

class FormUploadFile extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请上传',
      uploadText: '上传附件',
      uploadLimit: 10,
      uploadType: '',
      maxSize: 100,
      disabled: false
    };
  }

  getDefaultValue() {
    return [];
  }

  getText(value = []) {
    return value.map(item => item.name).join('、');
  }
}

class FormRadio extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      options: [],
      key: 'key',
      label: 'label',
      value: 'value',
      optionsPromise: null
    };
  }

  getText(value) {

    const option = this.options.find(item => item[this.value] === value);

    if (option) {
      return option[this.label];
    }

    return value;
  }
}

class FormCheckbox extends FormRadio {
  constructor(props = {}) {
    super(props);
  }

  getDefaultValue() {
    return [];
  }

  getText(value = []) {

    const _options = [];

    value.forEach(item => {
      const option = this.options.find(option => option[this.value] === item);
      if (option) {
        _options.push(option[this.label]);
      }
    });

    return _options.join('、');
  }
}

class FormSelect extends FormRadio {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false,
      options: [],
      key: 'key',
      label: 'label',
      value: 'value',
      clearable: true,
      optionsPromise: null
    };
  }
}

class FormSelectMultiple extends FormSelect {
  constructor(props = {}) {
    super(props);
  }

  getDefaultValue() {
    return [];
  }

  getText(value = []) {

    const _options = [];

    value.forEach(item => {
      const option = this.options.find(option => option[this.value] === item);
      if (option) {
        _options.push(option[this.label]);
      }
    });

    return _options.join('、');
  }
}

class FormColor extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请选择',
      disabled: false
    };
  }

  getDefaultValue() {
    return '#000000';
  }
}

class FormRichText extends FormItemProps {
  constructor(props = {}) {
    super(props);
  }

  getProps() {
    return {
      placeholder: '请输入',
      disabled: false
    };
  }
}

const formItems = {
  input: FormInput,
  textarea: FormTextarea,
  number: FormNumber,
  switch: FormSwitch,
  time: FormTime,
  timeToTime: FormTimeToTime,
  date: FormDate,
  dateToDate: FormDateToDate,
  dateTime: FormDateTime,
  dateTimeToDateTime: FormDateTimeToDateTime,
  uploadFile: FormUploadFile,
  radio: FormRadio,
  checkbox: FormCheckbox,
  select: FormSelect,
  selectMultiple: FormSelectMultiple,
  color: FormColor,
  richText: FormRichText
};

class FormTypeFactory {
  static create(type, props) {
    if (!type) {
      return {};
    }

    if (!formItems[type]) {
      return {};
    }

    const model = new formItems[type](props);

    return model;
  }
}

class FormItem {

  constructor(formItem = {}) {

    Object.assign(this, {
      key: 'default',
      label: '默认标题',
      type: '',
      props: {},
      required: false,
      showFn: (formData) => {
        return true;
      }
    }, formItem);

    // 临时存储提示信息
    const _placeholder = this.props.placeholder;

    this.props = FormTypeFactory.create(this.type, this.props);

    // 如果没有设置placeholder，则默认为label
    if (!_placeholder) {
      this.props.placeholder += this.label;
    }

  }
}

export default FormItem;