import * as Api from "@/api";
import IconEmail from "@/assets/img/icon-email.png";
import IconPwd from "@/assets/img/icon-pwd.png";
import LoginBanner from "@/assets/img/login-banner.png";
import TestAvatar from "@/assets/img/test-avatar.png";
import { useCallback, useRef, useState } from "react";
import AwButton from "./components/AwButton";
import AwForm from "./components/AwForm";
import AwInput, { AwInputExport } from "./components/AwInput";
import "./index.less";
import { LoginStepOneFormRules, LoginStepTwoFormRules } from "./static";

export default function Login() {
  const usernameInputComp = useRef<AwInputExport>(null);
  const passwordInputComp = useRef<AwInputExport>(null);
  const vercodeInputComp = useRef<AwInputExport>(null);

  /** 阶段表单值格式验证结果 */
  const [formCheckPassed, setFormCheckPassed] = useState({
    stepOne: false,
    stepTwo: false,
  });
  /** 当前的登录阶段 */
  const [loginStep, setLoginStep] = useState<1 | 2>(1);
  /** 登录-token */
  const [loginToken, setLoginToken] = useState("");

  const getLoginParams = useCallback(
    () => ({
      username: usernameInputComp.current!.getValue(),
      password: passwordInputComp.current!.getValue(),
    }),
    []
  );
  /** 登录一阶段 */
  const doLoginStepOne = useCallback(async () => {
    try {
      const params = getLoginParams();

      const loginResult = await Api.fetchLoginToken(params);
      if (loginResult.status === 0) {
        setLoginToken(loginResult.token);
        setLoginStep(2);
      } else {
        alert(loginResult.message);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  /** 登录二阶段 */
  const doLoginStepTwo = useCallback(async () => {
    try {
      const vercode = vercodeInputComp.current?.getValue() || "";
      if (!loginToken) {
        alert("token不存在");
        return;
      }
      const loginVercodeResult = await Api.loginVerify({
        token: loginToken,
        vercode,
      });
      if (loginVercodeResult.status === 0) {
        location.replace("https://www.lizhi.io");
      } else {
        alert(loginVercodeResult.message);
      }
    } catch (e) {
      console.log(e);
    }
  }, [loginToken]);
  const onStepFormCheck = useCallback(
    (step: keyof typeof formCheckPassed, r: boolean) => {
      setFormCheckPassed((e) => ({
        ...e,
        [step]: r,
      }));
    },
    []
  );

  return (
    <div className="login">
      <h1 className="login-title">登录</h1>
      <div className="login-banner">
        <img src={LoginBanner} alt="" />
      </div>
      <div className="login-content">
        <h2 className="login-content__title">DIGITALYCHEE</h2>
        <div
          className={[
            "login-content__phase",
            loginStep === 2 ? "step2" : "",
          ].join(" ")}
        >
          <div className="login-content__phase--step">
            <AwForm
              rules={LoginStepOneFormRules}
              onCheck={(e) => onStepFormCheck("stepOne", e)}
            >
              <AwInput
                keyword="username"
                maxLength={16}
                type="text"
                defaultValue="user09"
                ref={usernameInputComp}
                placeholder="请输入账号"
                icon={<img src={IconEmail} />}
              />
              <AwInput
                keyword="password"
                maxLength={32}
                type="password"
                defaultValue="OpenSesame"
                placeholder="请输入密码"
                ref={passwordInputComp}
                icon={<img src={IconPwd} />}
              />
            </AwForm>

            <AwButton
              disable={!formCheckPassed.stepOne}
              onClick={doLoginStepOne}
            >
              下一步
            </AwButton>
          </div>
          <div className="login-content__phase--step">
            <img src={TestAvatar} alt="" className="avatar" />
            <AwForm
              rules={LoginStepTwoFormRules}
              onCheck={(e) => onStepFormCheck("stepTwo", e)}
            >
              <AwInput
                keyword="vercode"
                maxLength={6}
                type="text"
                defaultValue="123456"
                placeholder="请输入密码"
                ref={vercodeInputComp}
                icon={<img src={IconPwd} />}
              />
            </AwForm>

            <AwButton
              disable={!formCheckPassed.stepTwo}
              onClick={doLoginStepTwo}
            >
              下一步
            </AwButton>
          </div>
        </div>
        <div className="login-content__footer">
          <hr />
          <a href="#">其他方式登录</a>
        </div>
      </div>
    </div>
  );
}
