import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserGeneratorProps } from "./UserGenerator.types";
import { Label } from "@/components/ui/label";

export function UserGenerator(props: UserGeneratorProps) {
  const { setUserTypeSelected } = props;
  return (
    <div className="p-4 bg-slate-100 rounded-md shadow-md ">
      <p className="mb-4 text-slate-500">¿Que quieres generar?</p>
      <RadioGroup
        defaultValue="username"
        onValueChange={(value) => setUserTypeSelected(value)}
      >
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="username" id="r2"></RadioGroupItem>
            <Label htmlFor="r2">Username</Label>
        </div>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="r1"></RadioGroupItem>
            <Label htmlFor="r1">Email</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
