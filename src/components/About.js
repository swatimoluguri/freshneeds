import Pizza from "../assets/pizza.png";

const About = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <div className="w-2/3 flex items-center justify-center">
        <span className="leading-15 px-5 text-6xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.pink.400),theme(colors.blue.500),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.300),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
          Get what you need,
          <br /> from Freshneeds !
        </span>
      </div>
      <div className="w-1/3">
        <img className="w-6/12 animate-spin-slow" src={Pizza} alt="pizza" />
      </div>
    </div>
  );
};

export default About;
