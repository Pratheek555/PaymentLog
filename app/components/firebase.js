import {
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import * as serviceAccount from "./sjbhsmun-2023-7119d354e60a.json";
import { google } from "googleapis";

const alreadyCreatedAps = getApps();

export const auth = new google.auth.GoogleAuth({
  keyFile: "app/components/sjbhsmun-2023-7119d354e60a.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const client = await auth.getClient();

if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });

export const googleSheets = google.sheets({ version: "v4", auth: client });
export const fireStore = getFirestore();
