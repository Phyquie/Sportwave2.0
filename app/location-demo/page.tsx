"use client";

import React from "react";
import LocationPicker, { useLocation } from "@/components/locationPicker";
import LocationButton from "@/components/locationButton";

export default function LocationDemo() {
  const { location } = useLocation();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Location Demo</h1>
      
      {/* Shows the current selected location */}
      <div className="mb-6">
        <p className="text-lg">Current location: <strong>{location || "No location selected"}</strong></p>
      </div>
      
      {/* Location picker will automatically open on page load if no location is set */}
      <LocationPicker />
      
      {/* Button to trigger location picker */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Change Location</h2>
        <LocationButton />
      </div>
    </div>
  );
}
