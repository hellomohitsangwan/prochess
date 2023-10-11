import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    return children;
}

export default Protected;
