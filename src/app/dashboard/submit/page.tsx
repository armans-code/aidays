"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AutocompleteAddress } from "../../register/page";
import {
  autocompleteAddress,
  createWant,
  getUserAddress,
} from "../../../lib/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const resourceTypes = [
  { id: "food", label: "Food" },
  { id: "water", label: "Water" },
  { id: "shelter", label: "Shelter" },
  { id: "medical", label: "Medical Supplies" },
  { id: "clothing", label: "Clothing" },
  { id: "hygiene", label: "Hygiene Products" },
  { id: "power", label: "Power/Electricity" },
  { id: "communication", label: "Communication Devices" },
  { id: "transportation", label: "Transportation" },
  { id: "other", label: "Other" },
];

export default function ResourceRequestForm() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AutocompleteAddress[]
  >([]);
  const [address, setAddress] = useState<AutocompleteAddress | null>(null);
  const [addressQuery, setAddressQuery] = useState("");
  const [info, setInfo] = useState("");
  const [urgency, setUrgency] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResourceToggle = (resourceId: string) => {
    setSelectedResources((current) =>
      current.includes(resourceId)
        ? current.filter((id) => id !== resourceId)
        : [...current, resourceId]
    );
  };

  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address || selectedResources.length === 0 || !urgency || !info) {
      setError("Please fill out all required fields.");
      return;
    }

    await createWant({
      clerkId: user?.id as string,
      info,
      urgency,
      address: address.name,
      place_id: address.place_id,
      tags: selectedResources,
    }).then(() => {
      toast.success("Request submitted successfully!");
      router.push("/dashboard");
    });
  };

  const handleAddressSelect = (address: AutocompleteAddress) => {
    setAddress(address);
    setAddressQuery(address.name);
    setAddressSuggestions([]);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddressQuery(value);
    console.log(value);
    if (value.length > 2) {
      const suggestions = await autocompleteAddress(value);
      setAddressSuggestions(suggestions);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setAddressSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user } = useUser();

  const handleSavedAddress = async () => {
    const clerkId = user?.id as string;
    const { address, place_id } = await getUserAddress(clerkId);
    setAddress({ name: address, place_id });
    setAddressQuery(address);
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Resources</CardTitle>
          <CardDescription>
            Submit a request for resources needed in your area.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="123 Example Road, Gainesville, FL 32611"
                required
                value={addressQuery}
                onChange={async (e) => handleChange(e)}
              />
              {addressSuggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1"
                >
                  {addressSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAddressSelect(suggestion)}
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
              <p
                onClick={async () => await handleSavedAddress()}
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                Use my saved address
              </p>
            </div>
            <div className="space-y-2">
              {/* TODO: handle this */}
              <Label>Resources Needed</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {resourceTypes.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={resource.id}
                      checked={selectedResources.includes(resource.id)}
                      onCheckedChange={() => handleResourceToggle(resource.id)}
                    />
                    <Label htmlFor={resource.id}>{resource.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select required value={urgency} onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Please provide any additional information about your resource needs..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <p className="text-red-600">{error}</p>
            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
