import React from "react";
import { Advocate } from "@/app/types/AdvocateTypes";

interface AdvocateRowProps {
    advocate: Advocate;
    index: number;
}

function AdvocateRow({ advocate, index }: AdvocateRowProps) {
    const rowBg = index % 2 === 0 ? "bg-white" : "bg-orange-100";
    const rowClasses = `${rowBg} hover:bg-slate-100 transition-colors`;

    return (
        <tr className={rowClasses}>
            <td className="td-base">{advocate.firstName}</td>
            <td className="td-base">{advocate.lastName}</td>
            <td className="td-base">{advocate.city}</td>
            <td className="td-base">{advocate.degree}</td>
            <td className="td-base">
                {(advocate?.specialties || []).map((s) => (
                    <span
                        key={`${advocate.phoneNumber}`}
                        className="chip"
                    >
                        {s}
                    </span>
                ))}
            </td>
            <td className="td-base">{advocate.yearsOfExperience}</td>
            <td className="td-base">{advocate.phoneNumber}</td>
        </tr>
    );
}

export default AdvocateRow;
