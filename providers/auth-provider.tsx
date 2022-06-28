import AuthLoader from "../components/auth-loader";
import useAuth from "../hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // If the session is not available and the user is not logged in, then redirect
  const { session } = useAuth();q

  // If the session is not available and the user is logged in, then show loader and render
  // Or  when the user tries to access restricted url and not logged in, then show loader and redirect
  if (!session) return <AuthLoader />;

  // If the session is available and the user is logged in then render
  return <div>{children}</div>;
};

export default AuthProvider;