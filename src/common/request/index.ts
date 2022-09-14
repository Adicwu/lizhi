export async function request<T>(
  url: string,
  body: RequestInit["body"],
  opt: RequestInit = {}
) {
  try {
    const respon = await fetch(url, {
      method: "POST",
      body,
      ...opt,
    });
    const res = await respon.json();
    return {
      data: res as T,
      status: respon.status,
    };
  } catch (e) {
    throw e;
  }
}
