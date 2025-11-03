import type { UseFetchOptions } from "#app";
import { defu } from "defu";

type ErrObjType = {
  status: number;
  message: string;
  errors: {
    [key: string]: string;
  };
};

type T = {};

export function defaultOptions() {
  const authToken = useCookie("auth_token"),
    rawHeaders = useRequestHeaders();

  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.API_BASE_URL || "",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${authToken.value || ""}`,
      "X-Forwarded-For": rawHeaders["x-forwarded-for"],
      "X-Real-Ip": rawHeaders["x-real-ip"],
    },
    onResponse(_ctx) {},

    // TODO Перевірити
    onResponseError({ request, response, options }) {
      if (response.status === 422 && response._data) {
        const data = response._data as Record<string, any>;

        const errObj: ErrObjType = {
          status: response.status,
          message: data.message ?? 'Validation error',
          errors: {},
        };

        if (data.errors && typeof data.errors === 'object') {
          for (const key in data.errors) {
            if (Object.prototype.hasOwnProperty.call(data.errors, key)) {
              errObj.errors[key] = data.errors[key][0];
            }
          }
        }

        response._data = errObj;
      }

      return response._data;
    },
  };

  return defaults;
}
export function useCustomFetch(url: string | (() => string), options: {}) {
  const defaults = defaultOptions();
  return useFetch(url, defu(options, defaults));
}
export function useClientFetch(url: string, options: {}) {
  const defaults = defaultOptions();
  return $fetch(url, defu(options, defaults));
}
