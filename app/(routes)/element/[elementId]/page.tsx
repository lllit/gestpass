import { FormEditElement } from "@/components/Shared/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ElementPage({
  params,
}: {
  params: Promise<{ elementId: string }>;
}) {
  const resolvedParams = await params;
  console.log("Params received:", resolvedParams);

  const elementId = String(resolvedParams.elementId); // Convertir a string

  if (!elementId) {
    return redirect("/");
  }

  const session = await getServerSession();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const element = await db.element.findUnique({
    where: { id: elementId },
  });

  if (!element) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Element Page</h1>
      <div>
        <FormEditElement dataElement={element}></FormEditElement>
      </div>
    </div>
  );
}
