import React, { useState } from "react";
import { Text, Input, useInput, Grid, Button } from "@nextui-org/react";
import { setAccessToken, setRefreshToken } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { CONSTANTS } from "../../constants/index";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();

  const { value, reset, bindings } = useInput("");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  const handleLogin = async () => {
    setLoading(true);

    var url = `${CONSTANTS.API_URL_PROD}/auth/login`;

    try {
      const res = await axios.post(url, {
        email: value,
        password: password,
      });

      console.log(res.data.access_token);
      const accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;

      if (accessToken && refreshToken) {
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        toast.success(res.data.message);
        router.push("/");
      } else {
        console.error("You are not authorized !");
        toast.error("Invalid server response");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid className="container mx-auto px-4 h-full" css={{ width: "30em" }}>
        <Grid className="flex content-center items-center justify-center h-full">
          <Grid className="w-full lg:w-6/12 px-4">
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 5000,
              }}
            />
            <Grid className="relative flex flex-col min-w-0 break-words pt-6 w-full mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg bg-opacity-50 backdrop-filter backdrop-blur-md border-0 carrrd">
              <Grid className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-6 ">
                <Grid className="text-blueGray-300 text-center  mb-8 font-bold">
                  <Text h4 size={"$2xl"} css={{ letterSpacing: "2px" }}>
                    Admin Login
                  </Text>
                </Grid>
                <form>
                  <Grid className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-300 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <Input
                      size="lg"
                      required
                      width="100%"
                      {...bindings}
                      clearable
                      shadow={false}
                      onClearClick={reset}
                      status={helper.color}
                      color={helper.color}
                      helperColor={helper.color}
                      helperText={helper.text}
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </Grid>
                  <br></br>
                  <Grid className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-300 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      size="lg"
                      required
                      clearable
                      width="100%"
                      {...bindings}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <br></br>
                  <Grid className="text-center mt-6">
                    <Button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
