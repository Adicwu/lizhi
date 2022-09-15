import { REG_USERNAME, REG_PASSWORD, REG_VERCODE } from "@/static/regs";
import { AwFormRule } from "../components/AwForm";

export const LoginStepOneFormRules: AwFormRule[] = [
  {
    keyword: "username",
    reg: REG_USERNAME,
    errorMsg: '邮箱格式错误，请重新输入'
  },
  {
    keyword: "password",
    reg: REG_PASSWORD,
    errorMsg: '密码格式错误，请重新输入'
  },
];
export const LoginStepTwoFormRules: AwFormRule[] = [
  {
    keyword: "vercode",
    reg: REG_VERCODE,
  },
];
