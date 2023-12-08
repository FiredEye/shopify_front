import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className=" my-6">
      <div className="h-[400px]">
        <dotlottie-player
          src="https://lottie.host/993c9841-6492-4729-b542-be0d3b3a29f8/ADkUM9mBMq.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
      </div>

      <div className="flex flex-col  justify-center items-center mt-6 gap-10">
        <h1 className="text-center">Page Not Found</h1>
        <button
          onClick={() => nav("/")}
          className="bg-gray-800 text-center text-gray-300 px-[20px] py-[12px] w-fit rounded hover:bg-black"
        >
          Go To Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
