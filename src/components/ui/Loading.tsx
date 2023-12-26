import capsulePng from "@assets/capsule.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={capsulePng}
        className="z-1 animate-loading"
        width={70}
        alt="loader"
      />
    </div>
  );
};
export default Loading;
