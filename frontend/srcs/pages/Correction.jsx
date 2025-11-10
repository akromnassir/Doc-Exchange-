import React, { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AssistantDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newDocDialogOpen, setNewDocDialogOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocDepartment, setNewDocDepartment] = useState("");
  const [newDocFile, setNewDocFile] = useState(null);
  const [newDocDesc, setNewDocDesc] = useState("");
  const [docDetailsDialogOpen, setDocDetailsDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const sampleData = [
    { id: 1, name: "Policy Draft", category: "Finance", date: "2025-01-10", status: "PENDING", file: "sample.pdf", description: "Policy draft for finance department." },
    { id: 2, name: "Education Proposal", category: "Education", date: "2025-01-08", status: "APPROVED", file: "education.pdf", description: "Proposal for education reform." },
    { id: 3, name: "Health Policy Update", category: "Health", date: "2025-01-07", status: "REJECTED", file: "health.pdf", description: "Health policy update document." },
    { id: 4, name: "Transport Plan", category: "Transportation", date: "2025-01-09", status: "PENDING", file: "transport.pdf", description: "Transportation plan overview." },
  ];

  useEffect(() => {
    const filtered = sampleData.filter(
        (item) =>
            (item.status === selectedTab || selectedTab === "ALL") &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedCategory || item.category === selectedCategory) &&
            (!startDate || new Date(item.date) >= new Date(startDate)) &&
            (!endDate || new Date(item.date) <= new Date(endDate))
    );
    setFilteredData(filtered);
  }, [selectedTab, searchQuery, selectedCategory, startDate, endDate]);

  const handleNewDocSubmit = () => {
    const newDoc = {
      id: filteredData.length + 1,
      name: newDocTitle,
      category: newDocDepartment,
      date: new Date().toISOString().split('T')[0],
      status: "PENDING",
      file: newDocFile ? newDocFile.name : "newdoc.pdf",
      description: newDocDesc,
    };
    setFilteredData((prevData) => [...prevData, newDoc]);
    setNewDocDialogOpen(false);
    setNewDocTitle("");
    setNewDocDepartment("");
    setNewDocFile(null);
    setNewDocDesc("");
  };

  const handleOpenDocDetails = (doc) => {
    setSelectedDoc(doc);
    setDocDetailsDialogOpen(true);
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        {/* <Navbar role="Personal Assistant - Approval Dashboard"/> */}
        <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-gray-600 rounded-md"
        >
          <FaBars/>
        </button>

        <main className="p-6 flex-grow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left border-b">
              <tr>
                <th className="py-2 px-4">Document Name</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Date</th>
              </tr>
              </thead>
              <tbody>
              {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 text-blue-500 cursor-pointer" onClick={() => handleOpenDocDetails(item)}>{item.name}</td>
                    <td className="py-2 px-4">{item.category}</td>
                    <td className="py-2 px-4">{item.date}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </main>

        <Dialog open={docDetailsDialogOpen} onClose={() => setDocDetailsDialogOpen(false)}>
          <DialogTitle>Document Details</DialogTitle>
          <DialogContent>
            {selectedDoc && (
                <div>
                  <p><strong>Title:</strong> {selectedDoc.name}</p>
                  <p><strong>Category:</strong> {selectedDoc.category}</p>
                  <p><strong>Date:</strong> {selectedDoc.date}</p>
                  <p><strong>Description:</strong> {selectedDoc.description}</p>
                  <iframe src={selectedDoc.file} width="100%" height="400px"></iframe>
                </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDocDetailsDialogOpen(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default AssistantDashboard;
