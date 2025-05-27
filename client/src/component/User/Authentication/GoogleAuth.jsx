import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginWithGoogle } from "../../../redux/reducers/userSlice";
import Loader from "../../Spinners/Loader";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.user);

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const result = await dispatch(loginWithGoogle(token)).unwrap();
      toast.success("Login successful!");

      const redirectPath = location.state?.from?.pathname || "/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  if (loading.googleLogin) {
    return <Loader loading={loading.googleLogin} />;
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.error("❌ Google login failed");
        toast.error("Google login failed");
      }}
    />
  );
};

export default GoogleAuth;
