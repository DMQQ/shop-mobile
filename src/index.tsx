import useFetch from "./utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import { CredentialsProps, userActions } from "./redux/User";
import MainNavigator from "navigation";
import useLoadApp from "utils/hooks/useLoadApp";
import { useAppSelector } from "utils/hooks/hooks";

export default function InitApp() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.user);
  const [isAppReady] = useLoadApp();

  useFetch("/auth/credentials", {
    invalidate: [isLoggedIn],
    fetchOnMount: isLoggedIn,
    onSuccess: (data: CredentialsProps) => {
      dispatch(userActions.setCredentials(data));
    },
  });

  return isAppReady ? <MainNavigator /> : null;
}
