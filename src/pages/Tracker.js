import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Input, Select, Button } from "@windmill/react-ui";

// Component for Icon rendering
function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Tracker = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: "Order #12345", status: "In Transit", image: null, recipient: "John Doe", address: "123 Main St, City, Country" },
    { id: 2, name: "Order #54321", status: "Delivered", image: null, recipient: "Jane Smith", address: "456 Oak Rd, City, Country" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPackageName, setNewPackageName] = useState("");
  const [newStatus, setNewStatus] = useState("In Transit");
  const [newImage, setNewImage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null); // State to hold the selected package for details

  // Handle adding a new package
  const handleAddPackage = () => {
    if (!newPackageName.trim()) {
      alert("Package name is required.");
      return;
    }

    const newPackage = {
      id: packages.length + 1,
      name: newPackageName,
      status: newStatus,
      image: newImage,
      recipient: "New Recipient", // Default recipient
      address: "New Address", // Default address
    };

    setPackages([newPackage, ...packages]);
    setNewPackageName("");
    setNewStatus("In Transit");
    setNewImage(null);
  };

  // Handle package search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Handle displaying package details
  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg); // Set the selected package for details
  };

  // Handle closing the package detail modal
  const handleCloseDetail = () => {
    setSelectedPackage(null); // Close the modal by resetting the selected package
  };

  return (
    <div>
      <PageTitle>Tracker</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Tracker</p>
      </div>

      {/* Admin Panel */}
      <Card className="mt-5 shadow-md">
        <CardBody>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Add Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label>
                <span>Package Name</span>
                <Input
                  className="mt-1"
                  placeholder="Enter package name"
                  value={newPackageName}
                  onChange={(e) => setNewPackageName(e.target.value)}
                />
              </Label>
            </div>
            <div>
              <Label>
                <span>Status</span>
                <Select
                  className="mt-1"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option>In Transit</option>
                  <option>Delivered</option>
                  <option>Pending</option>
                </Select>
              </Label>
            </div>
            <div>
              <Label>
                <span>Upload Image</span>
                <Input
                  type="file"
                  className="mt-1"
                  onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
                />
              </Label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddPackage} className="bg-purple-600 hover:bg-purple-700">
              Add Package
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Search and Table */}
      <Card className="mt-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Packages</h2>
            <Input
              className="w-1/3"
              placeholder="Search package..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="mt-4">
            {packages
              .filter((pkg) =>
                pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded shadow mb-2 cursor-pointer"
                  onClick={() => handlePackageClick(pkg)} // Add onClick handler
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status: {pkg.status}
                    </p>
                  </div>
                  {pkg.image && (
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}
          </div>
        </CardBody>
      </Card>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <Card className="max-w-md w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <CardBody>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Package Details
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Name:</strong> {selectedPackage.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Status:</strong> {selectedPackage.status}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Recipient:</strong> {selectedPackage.recipient}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Address:</strong> {selectedPackage.address}
              </p>
              {selectedPackage.image && (
                <div className="mt-4">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={handleCloseDetail} className="bg-gray-600 hover:bg-gray-700">
                  Close
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Tracker;
