import Link from "next/link";
import TextInput from "./../../components/Ui/useTextInput";

const Signin = () => {
  return (
    <div>
      <Link href="/signup">ㄱㄱㄱ</Link>
      <TextInput label="아이디" />
      <TextInput label="비밀번호" />
    </div>
  );
};

export default Signin;
