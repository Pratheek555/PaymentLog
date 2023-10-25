import { Uuidform } from "./frontEnd";
import { fireStore, googleSheets, auth } from "../components/firebase.js";
import { promises as fs } from "fs";
import path from "path";

const db = fireStore;
const individualJson = await fs.readFile(
  path.join(process.cwd(), "individual.json"),
  "utf8"
);
const individualList = JSON.parse(individualJson);
async function onClick(e, value) {
  "use server";

  //console.log(e)
  //console.log("hello world")
  await db.collection(individualList[e]).doc(e).update({ meals: value });
}
async function handleSubmit(uuid) {
  "use server";

  if (parseInt(uuid) % 10 == 0) {
    let person = await db.collection(individualList[uuid]).doc(uuid).get();
    let temp = { ...person.data() };
    temp.uuid = uuid;

    return [temp];
  } else if (parseInt(uuid) % 5 == 0) {
    return [{ name: "dello" }];
  } else {
    let sheet = await db.collection(uuid).where("food", "!=", null).get();
    let delegationName = "Individual";
    let delegation = await db.collection(uuid).doc("information").get();
    if (delegation.exists) {
      delegationName = delegation.data().name;
    }

    let temp = [];
    sheet.forEach((person) => {
      temp.push({
        uuid: person.id,
        name: person.data().name,
        email: person.data().email,
        committe: person.data().committee,
        delegation: delegationName,
        food: person.data().food,
        institution: person.data().institution,
        number: person.data().phoneNumber,
        checkIn: person.data().checkIn,
        meals: person.data().meals,
      });
    });
    return temp;
  }
}

export default async function Home() {
  return (
    <main className="bg-neutral-950">
      <Uuidform handleSubmit={handleSubmit} onClick={onClick} />
    </main>
  );
}
