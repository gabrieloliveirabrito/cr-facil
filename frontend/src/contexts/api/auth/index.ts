import axios, {
  AxiosInstance,
  HeadersDefaults,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import CheckTokenData from "./checkTokenData";

import SignInData from "./signInData";
import { SignInResult } from "./signInResult";
import UrlProviderData from "./urlProviderData";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export default class AuthAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    //axios.interceptors.request.use(this.authInterceptor);
  }

  private async authInterceptor(request: AxiosRequestConfig<any>) {
    if (request.url?.indexOf("/auth/") == -1) {
      const isSigned = await this.isSigned();
      if (isSigned) {
        const token = localStorage.getItem("ClearMe");

        if (token) {
          request.headers = {
            Authorization: `Bearer ${token}`,
          } as AxiosRequestHeaders;
        }
      }
    }

    return request;
  }

  public async getProviderURL(
    provider: string
  ): Promise<UrlProviderData | null> {
    try {
      const response = await this.axios.get<UrlProviderData | null>(
        `auth/${provider}`
      );
      console.log(response);

      if (response.status != 200) return null;
      else return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async signIn(token: string): Promise<SignInResult> {
    try {
      const response = await this.axios.get<SignInData>("/auth/signin");
      if (response.status != 200) return SignInResult.error;

      const data = response.data;
      if (data.result == SignInResult.success) {
        if (data.token == null) {
          return SignInResult.error;
        } else {
          localStorage.setItem("ClearMe", data.token);
          return SignInResult.success;
        }
      } else {
        return data.result ?? SignInResult.error;
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return SignInResult.error;
      } else {
        return SignInResult.error;
      }
    }
  }

  public async isSigned(): Promise<boolean> {
    try {
      const token = localStorage.getItem("ClearMe");
      if (token == null) return false;

      const response = await this.axios.get("/auth");
      console.log(response);

      return response.status == 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async validateToken(
    provider: string,
    token: string
  ): Promise<boolean> {
    try {
      const response = await this.axios.get<CheckTokenData>(
        `/auth/${provider}/check`,
        {
          params: { ct: token },
        }
      );

      if (response.status !== 200) return false;

      console.log(response.data);
      localStorage.setItem("ClearMe", response.data.Token);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
