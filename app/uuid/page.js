
import { fireStore, googleSheets, auth } from "../components/firebase.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const dynamic = "force-dynamic";
export default async function page() {
  const db = fireStore;
  const paymentSheet = "11GGo44DfpPyGUGWNcBEHvvvOvyqqvsVwYTeGjNHeKeI";
  const uuidPage = "1nUTSUhR1T5OolVq1gt8eoHggJVosYim3tTQ5I2aqA8I";

  const collections = await db.listCollections();
  let data = [];

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
    }

    let temp = [];
    sheet.forEach((person) => {
      temp.push([
        person.id,
        person.data().name,
        person.data().email,
        person.data().committee,
        delegationName,
        person.data().food,
        person.data().institution,
        person.data().phoneNumber,
      ]);
    });
    data.push(...temp);
  }
  const result = await googleSheets.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId: uuidPage, //spreadsheet id
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          "UUID",
          "NAME",
          "EMAIL",
          "COMITTEE",
          "DELEGATION",
          "FOOD PREFERENCE",
          "INSTITUTION",
          "PHONE NUMBERS",
        ],
        ...data,
      ],
    },
  });

  // await googleSheets.spreadsheets.values.update({
  //   auth, //auth object
  //   spreadsheetId: paymentSheet, //spreadsheet id
  //   range: "Sheet1",
  //   valueInputOption: "USER_ENTERED",
  //   resource: {
  //     values: [["NAME", "PAYMENT ID", "AMOUNT"], ...data],
  //   },
  // });

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
      <h1>{JSON.stringify(result.data)}</h1>
    </div>
  );
}
