"use client";
import { useState } from "react";

function Display({ people, onClick, query, refresh, changePeople }) {
  return (
    <div className="flex justify-center items-center flex-wrap">
      {people.map((person, i) => {
        return (
          <div
            key={i}
            className={` w-96 h-64 p-6 bg-black border ${
              person.meals == 1 ? "border-emerald-700 " : " border-red-500  "
            }rounded-md  m-12 `}
          >
            <h1 className="text-xl text-white font-bold">{person.uuid}</h1>
            <h1 className="text-xl text-white font-bold">{person.name}</h1>
            <h1 className="text-xl text-white font-bold">
              {person.phoneNumber}
            </h1>
            <h1 className="text-xl text-white font-bold">{person.email}</h1>
            <button
              type="button"
              class="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={async () => {
                await onClick(person.uuid, 1);
                let details = await refresh(query);

                console.log(details);
                changePeople(details);

                // let details = await props.handleSubmit(person.uuid.toString());
                // console.log(details);
                // changePeople(details);
              }}
            >
              TIME TO FEAST
            </button>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={async () => {
                await onClick(person.uuid, 0);
                let details = await refresh(query);

                console.log(details);
                changePeople(details);

                // let details = await props.handleSubmit(person.uuid.toString());
                // console.log(details);
                // changePeople(details);
              }}
            >
              GO BACK
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function Uuidform(props) {
  const [people, changePeople] = useState([{ name: "what" }]);
  const [query, changeQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 ">
      <h1 className="text-white text-xl font-extrabold mb-20">Hello WORLD</h1>

      <form
        action={async (e) => {
          let details = await props.handleSubmit(e.get("uuid"));
          changeQuery(e.get("uuid"));

          console.log(details);
          changePeople(details);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              for="uuid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              UUID
            </label>
            <input
              type="text"
              name="uuid"
              id="uuid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0000"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-amber-600 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          CHECK
        </button>
      </form>

      <Display
        people={people}
        onClick={props.onClick}
        refresh={props.handleSubmit}
        query={query}
        changePeople={changePeople}
      />
    </main>
  );
}
