"use client";

import { createProgram } from "@/app/actions/pages/programsAction";
import ProgramForm from "../components/ProgramForm";

export default function CreateProgram() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Program</h1>
        <p className="text-gray-500 mt-2">Add a new program to your platform.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProgramForm onSubmit={createProgram} />
      </div>
    </div>
  );
}
