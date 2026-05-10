import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignContent: "center",
        paddingTop: 50,
      }}
    >
      {/* Sign Up Logo */}
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Image
          source={require("@/assets/images/signUpLogo.png")}
          style={{
            width: 100,
            height: 100,
            marginTop: 30,
          }}
        />
      </View>

      {/* Text */}
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            padding: 10,
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "CenturyGothic",
          }}
        >
          Welcome to the Sign In Page!
        </Text>
      </View>

      {/* Email Field */}
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Email Address</Text>

        <TextInput
          style={{
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#77e45be7",
            padding: 10,
          }}
          placeholder="Enter Your Email Id"
        />
      </View>

      {/* Password Field */}
      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Password</Text>
        <TextInput
          style={{
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#77e45be7",
            padding: 10,
          }}
          placeholder="Enter Your Password"
          secureTextEntry={true}
        />
      </View>

      {/* Submit Button */}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          // alignItems: "center",
          alignContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            alert("Form Submitted!");
          }}
          style={{
            backgroundColor: "#15d451",
            padding: 10,
            borderRadius: 20,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
            Submit
          </Text>
        </Pressable>
      </View>

      {/* Sign In with other Options */}
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 20,
          flexDirection: "row",
          marginLeft: 20,

          padding: 20,
        }}
      >
        {/* FaceBook Image */}
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbsBdvjohWOLSCgQD_BBsTS5tytKR3NFelQ&s=",
          }}
          style={{
            width: 50,
            height: 50,
            alignContent: "center",
            alignItems: "center",

            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
        {/* Google Image */}
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydwcD4foKKbnxhpk8JyoMk-N60ZtVjvR91A&s",
          }}
          style={{
            width: 50,
            height: 50,

            marginLeft: 20,
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        />
        {/* Instagram Image */}
        <Image
          source={{
            uri: "https://img.magnific.com/premium-psd/instagram-icon-isolated-white-background-camera-icon-photo-frame-social-media-app-button-logo_989822-4635.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          style={{
            width: 50,
            height: 50,
            marginLeft: 20,
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        />
      </View>
      {/* Text: Don't have an account?signUp */}
      <View>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          {"Don't have an account? "}
          <Text
            style={{
              color: "#77e45be7",
              textDecorationLine: "underline",
            }}
          >
            SignUp.
          </Text>
        </Text>
        {/* Forgot Password */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginTop: 10,
            color: "#77e45be7",
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          Forgot Password?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
