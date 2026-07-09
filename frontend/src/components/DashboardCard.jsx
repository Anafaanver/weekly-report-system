export default function DashboardCard({
  title,
  value
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500 text-sm mb-3">
        {title}
      </h3>


      <h2 className="text-4xl font-bold text-blue-600">
        {value}
      </h2>


    </div>

  );

}