import { REG_USERNAME, REG_PASSWORD, REG_VERCODE } from "@/static/regs";
import { AwFormRule } from "../components/AwForm";

export const LoginStepOneFormRules: AwFormRule[] = [
  {
    keyword: "username",
    reg: REG_USERNAME,
  },
  {
    keyword: "password",
    reg: REG_PASSWORD,
  },
];
export const LoginStepTwoFormRules: AwFormRule[] = [
  {
    keyword: "vercode",
    reg: REG_VERCODE,
  },
];
