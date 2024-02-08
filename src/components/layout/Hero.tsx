import Image from "next/image";
import pizza from "../../../public/pizza.png";

const Hero = () => {
  return (
    <section>
      <div className="hero min-h-30 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div
            style={{ height: "40rem", width: "40rem", position: "relative" }}
          >
            <Image alt="Pizza" src={pizza} objectFit="contain" layout="fill" />
          </div>
          <div>
            <h1 className="text-5xl font-bold">
              Everyyhing is better with a{" "}
              <span className="text-red-500">Pizza</span>!
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div style={{ display: "flex", gap: 5 }}>
              <button className="btn btn-primary">Order Now</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
