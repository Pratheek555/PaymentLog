import { fdatasync } from "fs";
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
  const olduuidPage = "1nUTSUhR1T5OolVq1gt8eoHggJVosYim3tTQ5I2aqA8I";
  const uuidPage = "1G_fkLkrc3YOYUffzcvATgb6-2ZjvFDXcC7npLkmqJB8";
  const participationPage = "1dg67A9FvZIZQXGD-4F2W8ireQCsPm5j2WNv3NkmASGQ";

  const collections = await db.listCollections();
  let data = [];
  let food = [];

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
    let ftemp = [];

    sheet.forEach((person) => {
      let number;
      person.data.phoneNumber
        ? (number = person.data().phoneNumber.toString())
        : "";
      ftemp.push([person.id, person.data().name, person.data().meals]);
      let attendance;
      person.data().checkIn == 1
        ? (attendance = "present")
        : (attendance = "absent");
      // let check;
      // person.data().checkIn == 0 && person.data().meals == 1
      //   ? (check = "error")
      //   : (check = "valid");
      temp.push([
        person.id,
        person.data().name,
        delegationName,
        attendance,
        person.data().checkIn,
      ]);
    });
    data.push(...temp);
    food.push(...ftemp);
  }
  const fresult = await googleSheets.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId: participationPage, //spreadsheet id
    range: "Food",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["UUID", "NAME", "DAY 1 MEAL"], ...food],
    },
  });
  const result = await googleSheets.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId: participationPage, //spreadsheet id
    range: "Attendance",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["UUID", "NAME", "DELEGATION", "ATTENDANCE", "VALUE"], ...data],
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
      <h1>{JSON.stringify(fresult.data)}</h1>
    </div>
  );
}
