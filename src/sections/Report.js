import Link from "next/link";

export default function ReportCTA() {
  return (
    <section className="bg-white text-center py-8 px-4 rounded-lg shadow-md mt-18 border-t-3 border-b-3 border-[#1CDAE6]">
      <h2 className="text-2xl font-bold text-red-600">
        Spotted a Dengue Case or Mosquito Breeding Site? 🦟
      </h2>
      <p className="text-gray-700 mt-2">
        Help prevent outbreaks by reporting cases to local authorities!
      </p>
      <Link href="/report">
        <button className="mt-4 bg-red-600 text-white px-6 py-3 text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300">
          Report Dengue Case
        </button>
      </Link>
    </section>
  );
}
