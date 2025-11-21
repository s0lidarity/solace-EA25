"use client";

import { ChangeEvent, useEffect, useState } from "react";
import AdvocateRow from "./components/AdvocatesTable/AdvocateRow";
import { Advocate } from "./types/AdvocateTypes";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate []>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate []>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        const data: Advocate[] = jsonResponse.data;
        setAdvocates(data);
        setFilteredAdvocates(data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const st = term.trim().toLowerCase();
    if (!st){
      setFilteredAdvocates(advocates);
      return;
    }

    const filtered = advocates.filter((advocate) => {
      const first = advocate.firstName?.toLowerCase() ?? "";
      const last = advocate.lastName?.toLowerCase() ?? "";
      const city = advocate.city?.toLowerCase() ?? "";
      const degree = advocate.degree?.toLowerCase() ?? "";
      const specialties = (advocate.specialties || []).map((s) => (s ?? "").toLowerCase());
      const years = String(advocate.yearsOfExperience ?? "");

      return (
        first.includes(st) ||
        last.includes(st) ||
        city.includes(st) ||
        degree.includes(st) ||
        specialties.some((s) => s.includes(st)) ||
        years.includes(st)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="m-6 font-sans text-slate-900">
      <h1 className="text-2xl font-semibold mb-4">Solace Advocates</h1>
      <div className="flex items-center justify-between mb-4 gap-6">
        <p className="text-sm text-slate-600">Search</p>
        <p className="text-sm text-slate-500">
          Searching for: <span id="search-term" className="font-medium"></span>
        </p>
        <div className="flex items-center gap-3">
          <input 
            onChange={onChange} 
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900"
            placeholder="Type to filter..."/>
          <button 
            onClick={onClick}
            className="bg-teal-900 text-white px-3 py-2 rounded-md hover:bg-orange-400 transition-colors">
              Reset Search
          </button>
        </div>
      </div>
    <div className="overflow-hidden rounded-lg shadow-sm">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="th-primary">First Name</th>
              <th className="th-primary">Last Name</th>
              <th className="th-primary">City</th>
              <th className="th-primary">Degree</th>
              <th className="th-primary">Specialties</th>
              <th className="th-primary">Years of Experience</th>
              <th className="th-primary">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate, i) => {
              return (
                <AdvocateRow advocate={advocate} key={advocate?.phoneNumber} index={i}/>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
