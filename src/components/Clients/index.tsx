import SingleClient from "./SingleClient";
import { clientsData } from "./clientsData";

const Clients = () => {
  return (
    <section className="section-pad">
      <div className="page-width">
        <div className="border-line bg-line grid grid-cols-2 gap-px border sm:grid-cols-3 lg:grid-cols-5">
          {clientsData.map((client, i) => (
            <SingleClient key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
