import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function TimesheetForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [timesheets, setTimesheets] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const timesheetData = {
      name,
      date,
      hours,
    };
    setTimesheets([...timesheets, timesheetData]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(timesheets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheets');
    XLSX.writeFile(workbook, 'timesheets.xlsx');
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="date"
              placeholder="Enter date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hours">
              Hours
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="hours"
              type="number"
              placeholder="Enter hours"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="w-full max-w-lg mt-8 ml-8">
        {timesheets.length > 0 && (
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Hours</th>
                </tr>
              </thead>
              <tbody>
                {timesheets.map((timesheet, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{timesheet.name}</td>
                    <td className="border px-4 py-2">{timesheet.date}</td>
                    <td className="border px-4 py-2">{timesheet.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimesheetForm;