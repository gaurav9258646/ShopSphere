const StatCard = ({
  title,
  value,
  color,
}) => {

  return (

    <div
      className={`${color} rounded-xl shadow-lg p-6 text-white`}
    >

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>

    </div>

  );

};

export default StatCard;