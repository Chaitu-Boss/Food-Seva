import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Register() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const Navigate = useNavigate();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
    termsAgreed: false,
  });

  // const handleOnChange = (index, e) => {
  //     const value = e.target.value;
  //     if (/^\d$/.test(value)) {
  //         const newOtp = [...otp];
  //         newOtp[index] = value;
  //         setOtp(newOtp);

  //         if (index < 5) {
  //             inputRefs[index + 1].current.focus();
  //         }
  //     }
  // };
  const handleOnChange = (index, e) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Accept only a single digit
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { Username, email, phone, password, rememberMe, termsAgreed } =
      formData;

    // const phoneStr = phone.toString();

    // const lastTwoDigits = phoneStr.slice(-2);
    // const maskedPart = '*'.repeat(Math.max(0, phoneStr.length - 2));

    // const phoneNumber = maskedPart + lastTwoDigits;

    axios
      .post("http://localhost:5000/api/auth/sendOtp", { phone })
      .then((response) => {
        if (response.status === 200) {
          setShowOtpModal(true);
        } else {
          alert("Error Wrong OTP");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setShowOtpModal(true);
  }

  // const handleVerifyOtp = async () => {
  //     try {
  //         const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
  //             phone: "+91" + phone,
  //             otp: otp.join(""),
  //         });

  //         if (response.data.success) {
  //             alert("OTP Verified Successfully!");
  //             try {
  //                 axios.post("http://localhost:5000/api/auth/signup", { name, email, password, phone , registeredNumber : "" , role: "donor"})
  //                     .then((res) => {
  //                         if (res.status === 201) {
  //                             alert("Signup Successful");
  //                             console.log(res.data);
  //                             setShowOtpModal(false);
  //                             Navigate("/login");
  //                         }
  //                     })
  //                     .catch((err) => {
  //                         if(err.response.status === 400){
  //                             alert("Email already in use please Login")
  //                             Navigate("/auth")
  //                         }
  //                     })
  //             } catch (error) {
  //                 console.log(error);
  //             }

  //         } else {
  //             alert("Invalid OTP. Try again.");
  //         }
  //     } catch (error) {
  //         console.error("Error verifying OTP:", error);
  //     }
  // };
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyOtp",
        {
          phone: "+91" + formData.phone, // Fix: Use formData.phone
          otp: otp.join(""),
        }
      );

      if (response.data.success) {
        alert("OTP Verified Successfully!");
        try {
          axios
            .post("http://localhost:5000/api/auth/signup", {
              name: formData.Username, // Fix: Use formData.Username
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              registeredNumber: "",
              role: "donor",
            })
            .then((res) => {
              if (res.status === 201) {
                alert("Signup Successful");
                console.log(res.data);
                setShowOtpModal(false);
                Navigate("/login");
              }
            })
            .catch((err) => {
              if (err.response.status === 400) {
                alert("Email already in use, please login");
                Navigate("/auth");
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center pt-20">
        <Tabs defaultValue="individual" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="password">NGO</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle>Individual</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <form action="">
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      defaultValue=""
                      onChange={handleChange}
                      value={formData.Username}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Phone</Label>
                    <Input
                      id="phone"
                      onChange={handleChange}
                      type="phone"
                      defaultValue=""
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      onChange={handleChange}
                      type="password"
                      value={formData.password}
                      defaultValue=""
                      placeholder="password"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      required
                      className="w-4"
                    />
                    <Label htmlFor="rememberMe">Remember Me</Label>
                  </div>
                  <div className="flex items-center space-x-2 m-0">
                    <Input
                      type="checkbox"
                      name="termsAgreed"
                      onChange={handleChange}
                      checked={formData.termsAgreed}
                      required
                      className="w-4"
                    />
                    <Label htmlFor="termsAgreed">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="btn-primary mt-2  bg-gray-700 cursor-pointer text-white p-3 rounded-md"
                  >
                    Create account
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button className="btn-secondary mt-2 flex items-center justify-center bg-gray-700 text-white p-3 rounded-md">
                    <img
                      src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    Sign-in with Google
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-2">Create account</h2>
                <p className="text-gray-500 mb-4">For business, band or celebrity.</p>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="Username"
                        placeholder="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        className="input-field p-2 rounded-md border-2  border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field p-2 rounded-md border-2  border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 mb-8">
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field p-2 rounded-md border-2  border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field p-2 rounded-md border-2  border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex items-center mt-4">
                    <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} required/>
                    <label className="ml-2 text-gray-600">Remember me</label>
                </div>

                <div className="flex items-center mt-2">
                    <input type="checkbox" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} required/>
                    <label className="ml-2 text-gray-600">
                        I agree to all the <a href="#" className="text-blue-600">Terms</a> and <a href="#" className="text-blue-600">Privacy policy</a>
                    </label>
                </div>

                <a href="" className="text-blue-600 text-sm block mt-2 mb-2">Forgot password?</a>
                <div className="flex justify-around">
                    <button type="submit" className="btn-primary mt-2  bg-gray-700 cursor-pointer text-white p-3 rounded-md">Create account</button>

                    <button className="btn-secondary mt-2 flex items-center justify-center bg-gray-700 text-white p-3 rounded-md">
                        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign-in with Google
                    </button>
                </div>


                <p className="text-center mt-4 text-gray-600">
                    Already having an account? <a href="#" className="text-blue-600">Log In</a>
                </p>
            </form>
        </div> */}
      \
      <Modal
        isOpen={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
        appElement={document.getElementById("root")}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto z-[100]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]"
      >
        <h2 className="text-lg font-bold mb-4">OTP Verification</h2>

        {/* OTP Input Boxes */}
        <div className="flex space-x-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleOnChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowOtpModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </div>
      </Modal>
    </>
  );
}
