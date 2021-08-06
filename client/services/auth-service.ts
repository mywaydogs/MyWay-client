import { useEffect, useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import Router from "next/router";
import { UserDto } from "../dto/user.dto";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (
      error?.response?.status == 401 &&
      error.config.url !== "/api/auth/refresh" &&
      !error.config._retry
    ) {
      error.config._retry = true;
      await axios.get("/api/auth/refresh");
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

interface UseUserInterface {
  user: UserDto;
  error: any;
}

export function useUser({
  redirectTo,
  redirectIfFound,
}: { redirectTo?: string; redirectIfFound?: boolean } = {}): UseUserInterface {
  const { data, error } = useSWR("/api/users/profile");

  useEffect(() => {
    const isLoading = !data && !error;
    const user = data?.data;

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || isLoading) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, data, error]);

  return { user: data?.data, error };
}
