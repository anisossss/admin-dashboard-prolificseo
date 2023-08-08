import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { clearAuth } from "../path/to/authSlice";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router, isAuthenticated]);

  function authCheck(url) {
    const publicPaths = [
      "/",
      "/pricing",
      "/auth/login",
      "/auth/forget-password",
      "/auth/reset-password",
      "/support",
      "/privacy-policy",
      "/terms-&-conditions",
    ];
    // Allow all register routes and any content of query
    const registerRegex = new RegExp("^/auth/register\\b.*");
    if (
      !isAuthenticated &&
      !publicPaths.includes(url) &&
      !registerRegex.test(url)
    ) {
      setAuthorized(false);
      router.push("/auth/login", { shallow: true });
    } else {
      setAuthorized(true);
    }
  }

  return authorized ? children : null;
}
