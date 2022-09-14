import { request } from "@/common/request";

/**
 * 登录
 * @param param 
 * @returns 
 */
export async function fetchLoginToken(param: { username: string; password: string }) {
  const formData = new FormData();
  formData.append("username", param.username);
  formData.append("password", param.password);

  const { data } = await request<{
    data: {
      token: string;
    };
    status: number;
    message: string;
  }>("api/demo/login.php?phase=1", formData);
  return {
    status: typeof data.status === "undefined" ? -1 : data.status,
    message: data.message || "",
    token: data.data.token || "",
  };
}

export async function loginVerify(param: { token: string; vercode: string }) {
  const formData = new FormData();
  formData.append("tfa", param.vercode);

  const { data } = await request<{
    status: number;
    message: string;
  }>("api/demo/login.php?phase=2", formData, {
    headers: {
      Authorization: `Bearer ${param.token}`,
    },
  });
  return {
    status: typeof data.status === "undefined" ? -1 : data.status,
    message: data.message || "",
  };
}
