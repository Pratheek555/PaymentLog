import { fireStore, googleSheets, auth } from "../components/firebase.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
const individualJson = await fs.readFile(
  path.join(process.cwd(), "individual.json"),
  "utf8"
);
const individualList = JSON.parse(individualJson);
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export default async function page() {
  const db = fireStore;
  const paymentSheet = "11GGo44DfpPyGUGWNcBEHvvvOvyqqvsVwYTeGjNHeKeI";
  const olduuidPage = "1nUTSUhR1T5OolVq1gt8eoHggJVosYim3tTQ5I2aqA8I";
  const uuidPage = "1G_fkLkrc3YOYUffzcvATgb6-2ZjvFDXcC7npLkmqJB8";
  const certificates = "1GO6hOmgvuXgA4LHxQ0WWMOhVCavqWHgS1ruf5mjesdk";
  const forms = "1yKKICENf-Ss_OIojSL-6-PAnDOVjkiDMuA5vTRCgi0o";

  const collections = await db.listCollections();
  let data = [];
  const formData = (
    await googleSheets.spreadsheets.values.get({
      spreadsheetId: forms,
      range: "HSLS!2:79",
    })
  ).data.values;

  for (let k = 0; k < formData.length; k++) {
    console.log(formData[k][1]);
    let person = (
      await db
        .collection(individualList[formData[k][1]])
        .doc(parseInt(formData[k][1]).toString())
        .get()
    ).data();

    if (
      person.institution == "-" ||
      person.institution == "SJBHS" ||
      person.institution == "St Josephs Boys High School" ||
      person.institution == "St. Joseph's Boys' Highs School" ||
      person.institution == "St Joseph Boys high school "
    ) {
      data.push([
        formData[k][1],
        person.name,
        formData[k][2],
        formData[k][5],
        "St. Joseph's Boys' High School",
        person.email,
      ]);
    } else if (person.institution) {
      data.push([
        formData[k][1],
        person.name,
        formData[k][2],
        formData[k][5],
        person.institution.toString(),
        person.email,
      ]);
    } else if (individualList[formData[k][1]]) {
      data.push([
        formData[k][1],
        person.name,
        formData[k][2],
        formData[k][5],
        individualList[formData[k][1]],
        person.email,
      ]);
    } else data.push([formData[k][1], "not found"]);
  }
  const result = await googleSheets.spreadsheets.values.update({
    auth, //auth object
    spreadsheetId: certificates, //spreadsheet id
    range: "HSLS",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["UUID", "RECHECK", "NAME", "ALLOTMENT", "INSTITUTION", "EMAIL"],
        ...data,
      ],
    },
  });

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
      <h1>{JSON.stringify(result)}</h1>
      <h1>{data.length}</h1>
      <h1>{formData.length}</h1>
    </div>
  );
}
