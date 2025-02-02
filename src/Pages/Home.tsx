import { Link } from "react-router-dom";
import { HomeData } from "../utils/SoftData";

const Home = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          {HomeData.map((data, index) => (
            <Link to={data.link} className="text-blue-500 " key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  {data.title}
                </h2>
                <p className="text-gray-700 text-center">{data.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
