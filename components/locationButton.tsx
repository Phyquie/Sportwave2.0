'use client'
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useLocationStore } from "@/store/locationStore";
import LocationPicker from "./locationPicker";
import { Button } from "@/components/ui/button";

const LocationButton: React.FC = () => {
  const { location } = useLocationStore();

  return (
    <LocationPicker
      trigger={
        <Button variant="outline" size="sm" >
          <IoLocationSharp className="text-black" />
          <span className="max-w-[150px] truncate">
            {location || "Select Location"}
          </span>
        </Button>
      }
    />
  );
};

export default LocationButton;
