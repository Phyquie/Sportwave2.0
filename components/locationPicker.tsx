import React, { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocationStore } from "@/store/locationStore";
import { cn } from "@/lib/utils";

const popularCities = [
  { name: "Delhi", img: "/images/slide1.jpg" },
  { name: "Mumbai", img: "/images/slide2.jpg" },
  { name: "Kolkata", img: "/images/slide3.jpg" },
  { name: "Bengaluru", img: "/images/slide4.jpg" },
  { name: "Jaipur", img: "/images/slide1.jpg" },
  { name: "Chennai", img: "/images/slide2.jpg" },
  { name: "Ahmedabad", img: "/images/slide3.jpg" },
  { name: "Hyderabad", img: "/images/slide4.jpg" },
];

const statesInIndia = [
  "Karnataka",
  "Lakshadweep",
  "Dadra & Nagar Haveli",
  "Daman & Diu",
  "Andaman & Nicobar Islands",
  "Mizoram",
  "Pondicherry",
  "Sikkim",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

interface LocationPickerProps {
  trigger?: React.ReactNode;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ trigger }) => {
  const [showStates, setShowStates] = useState(false);
  const [open, setOpen] = useState(true);
  const { location, setLocation } = useLocationStore();
  
  // Request geolocation when component mounts
  useEffect(() => {
    // Only show popup if no location is selected
    if (!location) {
      setOpen(true);
    }
  }, [location]);
  
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Get location name from coordinates using reverse geocoding
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10`
            );
            const data = await response.json();
            
            // Extract city or state from the response
            const locationName = data.address.city || 
                                data.address.state ||
                                data.address.town ||
                                "Your location";
            
            setLocation(locationName);
            setOpen(false);
          } catch (error) {
            console.error("Error getting location name:", error);
            setLocation("Your location");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please select manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };
  
  const selectLocation = (name: string) => {
    setLocation(name);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
          <DialogDescription>
            Select your location to see relevant events and teams near you
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Use Current Location */}
          <Button 
            variant="outline" 
            onClick={handleUseCurrentLocation}
            className="flex items-center w-full mb-6 gap-2 border-blue-400 text-blue-600"
          >
            <IoLocationSharp className="text-lg" />
            Use current location
          </Button>

          {/* Popular Cities */}
          <h3 className="font-semibold mb-4 text-lg">Popular Cities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {popularCities.map((city) => (
              <div
                key={city.name}
                onClick={() => selectLocation(city.name)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-2">
                    <span className="text-white font-medium">{city.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All in India */}
          <div className="border rounded-lg overflow-hidden">
            <button
              className="flex items-center justify-between w-full p-3 font-medium bg-gray-50 border-b"
              onClick={() => setShowStates(!showStates)}
            >
              <span className="flex items-center gap-2">
                <span>All in India</span>
                <span className="text-sm">🇮🇳</span>
              </span>
              {showStates ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            {showStates && (
              <div className="max-h-[300px] overflow-y-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {statesInIndia.map((state) => (
                    <div
                      key={state}
                      onClick={() => selectLocation(state)}
                      className="py-2 px-3 text-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 rounded-md"
                    >
                      <span>{state}</span>
                      <FaChevronRight className="text-xs text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPicker;

// This hook can be used to access the location state anywhere in the app
export const useLocation = () => {
  const { location, setLocation } = useLocationStore();
  return { location, setLocation };
};
