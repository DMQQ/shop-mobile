import axios from "axios";
import { useEffect } from "react";
import { API } from "@constants/routes";
import { USER_PREFIX, useUser } from "@utils/context/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../@types/types";

/**
 * Hook that sends request for new JWT token to the server, if current token is invalid it displays global modal and forces user to sign again
 * @returns {UserType} user state
 **/
export default function useCheckToken(): UserType {
  const { user, SaveUser, setUser } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (user.token) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${API}/auth/token`,
            {},
            {
              headers: { token: user.token },
              cancelToken: cancelToken.token,
            }
          );

          SaveUser({
            isLoggedIn: true,
            token: data.token,
            name: user.name,
            user_id: data.id,
          });
        } catch (err: any) {
          if (typeof err?.response?.data !== "undefined") {
            Alert.alert("Session Expired", "Please login again", [
              {
                text: "Log in",
                onPress: () => {
                  AsyncStorage.removeItem(USER_PREFIX).then(() => {
                    setUser((p: UserType) => ({ ...p, isLoggedIn: false }));
                  });
                },
              },
            ]);
          }
        }
      })();
    }

    return () => cancelToken.cancel("Canceled");
  }, [user.token]);

  return user;
}
