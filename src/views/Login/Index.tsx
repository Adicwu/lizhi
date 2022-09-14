import React, { useCallback, useRef } from "react";
import "./index.less";
import { REG_USERNAME, REG_PASSWORD } from "@/static/regs";
import * as Api from "@/api";

export default function Login() {
  const usernameInputEl = useRef<HTMLInputElement>(null);
  const passwordInputEl = useRef<HTMLInputElement>(null);

  const getLoginParams = useCallback(() => {
    const username = usernameInputEl.current?.value || "";
    const password = passwordInputEl.current?.value || "";
    if (!REG_USERNAME.test(username)) {
      throw new Error("用户名验证错误");
    }
    if (!REG_PASSWORD.test(password)) {
      throw new Error("密码验证错误");
    }
    return {
      username,
      password,
    };
  }, []);

  const doLogin = async () => {
    try {
      const params = getLoginParams();

      const loginResult = await Api.fetchLoginToken(params);
      if (loginResult.status !== 0) {
        console.log(loginResult.message);
        return;
      }

      const loginVercodeResult = await Api.loginVerify({
        token: loginResult.token,
        vercode: '123456',
      });
      if (loginVercodeResult.status === 0) {
        location.replace("https://www.lizhi.io");
      } else {
        console.log(loginVercodeResult.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      <input type="text" defaultValue="user09" ref={usernameInputEl} />
      <input type="password" defaultValue="OpenSesame" ref={passwordInputEl} />
      <button onClick={doLogin}>do</button>
    </div>
  );
}
