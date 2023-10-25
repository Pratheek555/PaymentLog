import { fireStore, googleSheets, auth } from "../components/firebase.js";
import individualJson from "../../individual.json";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import fs from "fs";

export const dynamic = "force-dynamic";
export default async function page() {
  const db = fireStore;
  const paymentSheet = "11GGo44DfpPyGUGWNcBEHvvvOvyqqvsVwYTeGjNHeKeI";
  const uuidPage = "1nUTSUhR1T5OolVq1gt8eoHggJVosYim3tTQ5I2aqA8I";

  const collections = await db.listCollections();
  let individualList = {};
  let delegationList = [];

  // for (let k = 0; k < collections.length; k++) {
  //   let sheet = await db
  //     .collection(collections[k].id)
  //     .where("payment_id", "!=", null)
  //     .get();
  //   let temp = [];
  //   sheet.forEach((person) => {
  //     person.data().total
  //       ? (person.money = parseInt(person.data().total) * 1299)
  //       : (person.money = 1299);
  //     temp.push([person.data().name, person.data().payment_id, person.money]);
  //   });
  //   data.push(...temp);
  // }

  for (let k = 0; k < collections.length; k++) {
    let sheet = await db
      .collection(collections[k].id)
      .where("food", "!=", null)
      .get();
    let delegationName = "Individual";
    let delegation = await db
      .collection(collections[k].id)
      .doc("information")
      .get();

    if (delegation.exists) {
      delegationName = delegation.data().name;
      let temp = {};
      temp[delegationName] = delegation.data().total;
      delegationList.push(temp);
    }
    sheet.forEach(async (person) => {
      individualList[person.id] = collections[k].id;
      await db
        .collection(collections[k].id)
        .doc(person.id)
        .update({ checkIn: 0, meals: 0 });
    });
    fs.writeFileSync("app/individual.json", JSON.stringify(individualList));
  }
  console.log(delegationList);

  return (
    <div>
      {/* {data.map((item) => {
        return (
          <h1 key={item}>{`${item.money}  ${item.data().name} ${
            item.data().payment_id
          }`}</h1>
        );
      })} */}
      {/* <h1>HELLO WORLD</h1> */}
      {delegationList.map((name, i) => {
        return <h1 key={i}>{JSON.stringify(name)}</h1>;
      })}
    </div>
  );
}
