"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { copyClipboard } from "@/lib/copyClipboard";
import { Copy, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { PasswordGenerator } from "./PasswordGenerator";
import { UserGenerator } from "../UserGenerator";
import { generateCustomPassword } from "@/lib/generateCustomPassword";
import { generateRandomUsername } from "@/lib/generateRandomUser";
import { generateRandomEmail } from "@/lib/generateRandomEmail";

export function FormGenerator() {
  const [itemValueInput, setItemValueInput] = useState("");

  const [selectedValue, setSelectedValue] = useState<
    "password" | "user" | string
  >("password");
  const [userTypeSelected, setUserTypeSelected] = useState("username");
  const [LengthPassword, setLengthPassword] = useState(11);
  const [isMayusSelected, setIsMayusSelected] = useState(true);
  const [isMinusSelected, setIsMinusSelected] = useState(true);
  const [isNumberSelected, setIsNumberSelected] = useState(true);
  const [isSpecialCharacters, setIsSpecialCharacters] = useState(true);

  useEffect(() => {
    if (selectedValue === "password") {
      const newPassword = generateCustomPassword(
        LengthPassword,
        isMayusSelected,
        isMinusSelected,
        isNumberSelected,
        isSpecialCharacters
      );
      //console.log(newPassword);

      setItemValueInput(newPassword);
    }
  }, [
    LengthPassword,
    isMayusSelected,
    isMinusSelected,
    isNumberSelected,
    isSpecialCharacters,
    selectedValue,
  ]);

  useEffect(() => {
    if (selectedValue === "user") {
      const newUserGenerated = generateRandomUsername();
      setItemValueInput(newUserGenerated);
    }
    if(userTypeSelected === 'email'){
      const newEmailGenerated = generateRandomEmail();
      setItemValueInput(newEmailGenerated);
    }



  }, [selectedValue, userTypeSelected]);

  const handleShuffleClick = () => {
    if (selectedValue === "password") {
      const password = generateCustomPassword(
        LengthPassword,
        isMayusSelected,
        isMinusSelected,
        isNumberSelected,
        isSpecialCharacters
      );
      setItemValueInput(password);
    } else if(selectedValue === "user"){
      if(userTypeSelected === "email"){
        const email = generateRandomEmail();
        setItemValueInput(email);
        
      } else{
        const username = generateRandomUsername()
        setItemValueInput(username);
      }
    }
  };

  //console.log(selectedValue);

  return (
    <div className="mt-5 max-w-2xl">
      <div className="relative w-full">
        <Input
          placeholder="input.."
          value={itemValueInput}
          onChange={() => {}}
        ></Input>
        <Copy
          className="absolute top-3 right-12 cursor-pointer h-5 w-5"
          onClick={() => copyClipboard(itemValueInput)}
        ></Copy>
        <Shuffle
          className="absolute top-3 right-2 cursor-pointer h-5 w-5"
          onClick={handleShuffleClick}
        ></Shuffle>
        <div className="bg-slate-100 rounded-md shadow-md my-4 p-4">
          <p className="mb-4 text-slate-500">¿Que quieres generar?</p>
          <RadioGroup
            defaultValue="password"
            onValueChange={(value) => setSelectedValue(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="password" id="r1"></RadioGroupItem>
              <Label htmlFor="r1">Password</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="r2"></RadioGroupItem>
              <Label htmlFor="r2">Usuario</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {selectedValue === "password" ? (
        <PasswordGenerator
          LengthPassword={LengthPassword}
          setLengthPassword={setLengthPassword}
          isMayusSelected={isMayusSelected}
          setIsMayusSelected={setIsMayusSelected}
          isMinusSelected={isMinusSelected}
          setIsMinusSelected={setIsMinusSelected}
          isNumberSelected={isNumberSelected}
          setIsNumberSelected={setIsNumberSelected}
          isSpecialCharacters={isSpecialCharacters}
          setIsSpecialCharacters={setIsSpecialCharacters}
        ></PasswordGenerator>
      ) : (
        <UserGenerator
          setUserTypeSelected={setUserTypeSelected}
        ></UserGenerator>
      )}
    </div>
  );
}
