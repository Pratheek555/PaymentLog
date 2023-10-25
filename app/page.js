import { Uuidform } from "./components/frontEnd";
import { fireStore, googleSheets, auth } from "./components/firebase.js";
import fs from "fs"

const db = fireStore;
const individualJson = fs.readFileSync("individual.json")
const individualList = JSON.parse(individualJson)
async function onClick(e, value) {
  "use server"

  //console.log(e)
  //console.log("hello world")
  await db.collection(individualList[e]).doc(e).update({ checkIn: value })

}
async function handleSubmit(uuid) {
  "use server";

  if (parseInt(uuid) % 10 == 0) {

    let person = await db.collection(individualList[uuid]).doc(uuid).get()
    let temp = { ...person.data() }
    temp.uuid = uuid

    return [temp]
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
