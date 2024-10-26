"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import {
  autocompleteAddress,
  registerUser,
  validateUsername,
} from "../../lib/actions";
import { useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type RegisterFormData = {
  username: string;
  password: string;
  phone: string;
  address: string;
};

export type AutocompleteAddress = {
  name: string;
  distance: number;
  place_id: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [address, setAddress] = useState<AutocompleteAddress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AutocompleteAddress[]
  >([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const clerk = useClerk();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (name === "address" && value.length > 2) {
      const suggestions = await autocompleteAddress(value);
      setAddressSuggestions(suggestions);
    }
  };

  const handleAddressSelect = (address: AutocompleteAddress) => {
    setFormData((prev) => ({ ...prev, address: address.name }));
    setAddress(address);
    setAddressSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (Object.values(formData).some((value) => value === "")) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      if (address) {
        await validateUsername(formData.username);
        await registerUser(formData, address)
          .then(() => {
            toast.success("Account created successfully. Please sign in.");
            clerk.redirectToSignIn();
          })
          .catch(() => {
            setError("An error occurred. Please try again.");
          });
      } else setError("Please select an address from the suggestions");
    } catch (err) {
      // @ts-expect-error - Error object
      setError(err.message);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={async (e) => await handleChange(e)}
                placeholder="Enter your address"
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
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
