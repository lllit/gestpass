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
      <div className="flex justify-center h-full ">
        <div className="text-white flex flex-col items-center justify-center sm:px-8">
          <h1 className="text-blue-500 text-2xl text-center mb-3 sm:mb-5">
            GestorPass
          </h1>
          <h2 className="text-4xl font-medium text-black">Bienvenidos</h2>
          <p className="text-center mt-2 sm:mt-4 mb-4 sm:mb-6 text-slate-400 text-xs sm:text-sm">
            Bienvenidos, por favor ingrese los detalles
          </p>
          <TabsForms></TabsForms>
        </div>
      </div>
      <ImageAuth></ImageAuth>
    </div>
  );
}
