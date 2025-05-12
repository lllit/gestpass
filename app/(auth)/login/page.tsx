import { getServerSession } from "next-auth";
import ImageAuth from "./components/ImageAuth/ImageAuth";
import TabsForms from "./components/TabsForms/TabsForms";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="grid sm:overflow-auto md:grid-cols-2 h-full max-h-screen overflow-hidden">
      <div className="flex justify-center h-full">
        <div className="text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-blue-500 text-2xl text-center mb-5">
            GestorPass
          </h1>
          <h2 className="text-4xl font-medium text-black">Bienvenidos</h2>
          <p className="text-center mt-4 mb-6 text-slate-400 text-sm">
            Bienvenidos, porfavor ingrese los detalles
          </p>
          <TabsForms></TabsForms>
        </div>
      </div>
      <ImageAuth></ImageAuth>
    </div>
  );
}
