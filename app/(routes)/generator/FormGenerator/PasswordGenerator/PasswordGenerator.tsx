import { Checkbox } from "@/components/ui/checkbox";
import { PasswordGeneratorProps } from "./PasswordGenerator.types";

export function PasswordGenerator(props: PasswordGeneratorProps) {
  const {
    isMayusSelected,
    isMinusSelected,
    isNumberSelected,
    isSpecialCharacters,
    LengthPassword,
    setIsMayusSelected,
    setIsMinusSelected,
    setIsNumberSelected,
    setIsSpecialCharacters,
    setLengthPassword,
  } = props;

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLengthPassword(Number(event.target.value));
  };
  return (
    <>
      <div className="w-full p-4 bg-slate-100 rounded-md shadow-md flex gap-2 items-center">
        <label className="block text-sm font-medium text-gray-700 min-w-32">
          Longitud: {LengthPassword}
        </label>
        <input
          type="range"
          id="range"
          min={"8"}
          max={"50"}
          className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
          value={LengthPassword}
          onChange={handleRangeChange}
        />
      </div>
      <div>
        <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
          <Checkbox
            id="mayus"
            checked={isMayusSelected}
            onCheckedChange={() => setIsMayusSelected((prev) => !prev)}
          ></Checkbox>
          <label
            htmlFor="mayus"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed perr-disable:opacity-7"
          >
            Mayúsculas A-Z
          </label>
        </div>
        <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
          <Checkbox
            id="minus"
            checked={isMinusSelected}
            onCheckedChange={() => setIsMinusSelected((prev) => !prev)}
          ></Checkbox>
          <label
            htmlFor="minus"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed perr-disable:opacity-7"
          >
            Minúsculas a-z
          </label>
        </div>
        <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
          <Checkbox
            id="numbers"
            checked={isNumberSelected}
            onCheckedChange={() => setIsNumberSelected((prev) => !prev)}
          ></Checkbox>
          <label
            htmlFor="numbers"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed perr-disable:opacity-7"
          >
            Numeros 0-9
          </label>
        </div>
        <div className="flex items-center space-x-2 my-4 bg-slate-100 rounded-md shadow-md p-4">
          <Checkbox
            id="special"
            checked={isSpecialCharacters}
            onCheckedChange={() => setIsSpecialCharacters((prev) => !prev)}
          ></Checkbox>
          <label
            htmlFor="special"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed perr-disable:opacity-7"
          >
            Caracteres !@#!%#&/$...
          </label>
        </div>
      </div>
    </>
  );
}
