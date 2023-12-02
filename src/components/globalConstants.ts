import dayjs from "dayjs";
// 样式相关
export const BASE_GAP = 16;

export const PAGE_SIZE_MAXIMUM = 1000;

// 分页
export const INIT_PAGINATION: typePagination = {
  pageSize: 20,
  pageNo: 1,
  total: 0,
};
// 分页新规范
export const INIT_PAGINATION_NEW: typePagination = {
  pageSize: 20,
  pageNum: 1,
  total: 0,
};
export const PAGINATION_SIZE_OPTIONS = ["10", "20", "30", "50", "100"];

// 枚举
// 企业类型
export enum EnterpriseType {
  join = "自营",
  self_operated = "加盟",
  proxy_operations = "代运营",
}
// 企业认证状态
export enum EnterpriseAuthenticationStatus {
  unauthorized = "未认证",
  authorized = "已认证",
  wait_audit = "待审核",
  reject = "未通过",
}
// 企业性质
export enum EnterpriseNature {
  private_enterprise = "民企",
  state_owned_enterprises = "国企",
  institutions = "事业单位",
  other = "其他",
}

// 正则
export const MOBILE_REGEXP = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
export const VIN_CODE =
  /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/;
/** 身份证*/
export const ID_CARD_RGE =
  /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
/** 企业代码*/
export const UNIFIED_CODE_REG = /^[A-Z|\d]{2}\d{6}[A-Z|\d]{10}$/;
/** 用户名*/
export const ACCOUNT_REG = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
/** 短信验证码 */
export const MOBILE_VERIFY_CODE = /^\d{6}$/;
/** 手机号码 */
export const PHONE_NO = /^1\d{10}$/;

export const AMAP_LOADER = {
  key: "5c4efdb1cfd3875e17eecb13b171e976", // 新key，易易
  // key: '4e795c3342e69dc3702078cd98ed9eca', // 旧key，科技集团
  // key: '78ba04bbb66b51042564ff6041f563df', // 枫盛汽车 应用下key，与Android/iOS相同应用
  version: "2.0",
};
// 其他
export const IMAGE_FALLBACK =
  "data:image/png;base64,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";

// 近一个月
export const getPresetDatePickerRange = () => {
  return [dayjs().subtract(29, "day").startOf("day"), dayjs().endOf("day")];
};

export const PAYMENT_STATUS = [
  { label: "待缴纳", value: "wait_pay" },
  { label: "已缴纳", value: "finish,wait_refund" },
  { label: "已关闭", value: "cancel" },
  { label: "已退还", value: "close" },
];

export const CHARGE_MODE = [
  { value: "1", label: "里程计费", unitLabel: "元/km" },
  { value: "2", label: "度电计费", unitLabel: "元/度" },
];

export const RENT_EQUITY = [
  { value: "guaranteedMileage", label: "保底里程" },
  { value: "2", label: "里程单价", disabled: true },
  { value: "3", label: "按照所在城市计费规则", disabled: true },
];

export const PAYMENT_CHANNEL = [
  { label: "支付宝APP支付直连", value: "alipay" },
  { label: "支付宝手机网站支付", value: "alipayWap" },
  { label: "支付宝红包支付", value: "ali_redpacket_pay" },
  { label: "微信APP支付直连", value: "weixin" },
  { label: "微信H5支付", value: "weixinH5" },
  { label: "云闪付", value: "unionpay" },
  { label: "钱包余额支付", value: "balance" },
  { label: "企业支付", value: "companypay" },
  { label: "京东聚合支付-微信支付", value: "jdAggWeixin" },
  { label: "京东聚合支付-支付宝支付", value: "jdAggAlipay" },
  { label: "微信WEB支付", value: "weixinWeb" },
  { label: "支付宝WEB支付", value: "alipayWeb" },
  { label: "云闪付WEB支付", value: "unionWebPay" },
];

// 换电类型
export const CHERGE_TYPE = [
  { label: "手动换电", value: "manual" },
  { label: "自动换电", value: "auto" },
];

// 里程抵扣
export const JIAO_JIE_MILEAGE = [
  { value: "PACKAGE", label: "套餐抵扣" },
  { value: "MILEAGE_BENEFIT", label: "保底里程抵扣" },
  { value: "UN_USED", label: "否" },
];

// 是否使用优惠券
export const IS_COUPON_TYPE = [
  { label: "是", value: true },
  { label: "否", value: false },
];

// 电池包编码
export const BATTERY_CODE = [
  { label: "换上电池", value: "upBatteryNo" },
  { label: "换下电池", value: "downBatteryNo" },
];

// 计费方式
export const CHARGING_MODE = [
  { label: "里程", value: "mileage" },
  { label: "度电", value: "quantity_electric" },
];

// 修改密码规则
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&.])[A-Za-z\d$@!%*?&.]{10,16}$/;

// 审核结果
export const CHECK_RESULT = [
  { key: 0, value: "待审核" },
  { key: 1, value: "通过" },
  { key: 2, value: "不通过" },
];

// 订单状态
export const ORDER_STATUS = [
  { label: "换电中", value: "wait_start,wait_end" },
  { label: "待支付", value: "wait_pay,wait_promo" },
  { label: "待退款", value: "wait_refund" },
  { label: "支付成功", value: "wait_finish,finish" },
  { label: "已取消", value: "cancel" },
  { label: "已关闭", value: "close" },
  { label: "金额待生成", value: "wait_calculate" },
];

// 订单时间类型
export const ORDER_TIME_TYPE = [
  { label: "下单时间", value: "orderTime" },
  { label: "支付时间", value: "payTime" },
];

// 交接班状态
export const JIAOJIE_STATUS = [
  { label: "待接班确认", value: "wait_confirm" },
  { label: "待支付", value: "wait_pay" },
  { label: "已驳回", value: "reject" },
  { label: "已取消", value: "cancel" },
  { label: "已完成", value: "finish" },
  { label: "已关闭", value: "close" },
];

export const JIAOJIE_MILEAGE = [
  { value: "PACKAGE", label: "套餐抵扣" },
  { value: "MILEAGE_BENEFIT", label: "保底里程抵扣" },
  { value: "UN_USED", label: "否" },
];

export const HEATMAP_DEFAULT_OPTIONS = {
  radius: 20,
  max: 100,
  // https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/heat-map-module-examples/heat-map-color-gradients Visible Spectrum
  gradient: {
    0: "rgb(255,0,255)",
    0.25: "rgb(0,0,255)",
    0.5: "rgb(0,255,0)",
    0.75: "rgb(255,255,0)",
    1: "rgb(255,0,0)",
  },
};

// 消息推送状态
export const PUSH_STATUS = [
  { label: "草稿", value: 0 },
  { label: "待推送", value: 1 },
  { label: "已推送", value: 2 },
];

export const DETAULT_FORM_SELECT_PROPS = {
  placeholder: "全部",
};

export const DETAULT_INPUT_ACCURATE_PROPS = {
  placeholder: "精确查询",
};

export const DETAULT_INPUT_VAGUE_PROPS = {
  placeholder: "模糊查询",
};

export const REFUND_CHANNEL = [
  { label: "支付宝", value: "alipay" },
  { label: "微信", value: "weixin" },
  { label: "银行转账", value: "bank_transfer" },
  { label: "京东支付", value: "jdPay" },
];

export const CMD_RESULT_MAP = [
  { value: 1, label: "成功" },
  { value: 2, label: "处理中" },
  { value: 3, label: "超时" },
  { value: 4, label: "异常" },
  { value: 5, label: "失败" },
];

export const UPLOAD_FORM_PROPS_FIXED = {
  valuePropName: "fileList",
  getValueFromEvent: (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
};

/** 退款类型*/
export const REFUND_TYPE = [{ label: "售后退款", value: "after_sale" }];
