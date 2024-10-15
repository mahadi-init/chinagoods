import { cookies } from "next/headers";
import SellerEdit from "./ui";

export default async function Edit() {
  const auth = cookies().get("authId")?.value;
  console.log(auth);

  return <SellerEdit id={auth} />;
}
