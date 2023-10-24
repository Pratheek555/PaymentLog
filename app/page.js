import { Uuidform } from "./components/frontEnd";
import { fireStore, googleSheets, auth } from "./components/firebase.js";
const db = fireStore;
async function handleSubmit(e) {
  "use server";
  let uuid = e.get("uuid");
  if (parseInt(uuid) % 10 == 0) {
    return [{ name: "hello" }];
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
      });
    });
    return temp;
  }
}

export default async function Home() {
  return (
    <main className="bg-neutral-950">
      <Uuidform handleSubmit={handleSubmit} />
    </main>
  );
}
