import Header from "../header/page";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Our Church
        </h1>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates cupiditate quasi beatae libero voluptate repellendus 
            voluptatibus delectus quas, saepe perferendis, sed explicabo, nihil corrupti dignissimos praesentium. Beatae in dolorem perspiciatis.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Point:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minus, iure dolores incidunt pariatur consequatur dicta recusandae suscipit nostrum ut vel ea praesentium eos possimus amet natus. Iusto, voluptatum labore! </li>
            <li><strong>Point:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora labore nulla, sit voluptate fuga iure quos veniam repellat officia tenetur explicabo animi sapiente enim dicta impedit sequi, necessitatibus exercitationem mollitia. </li>
            <li><strong>Point:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit natus, doloribus eum, itaque amet quas accusamus labore sed officia error suscipit explicabo necessitatibus mollitia a autem nisi. Voluptatum, dignissimos maxime! </li>
            <li><strong>Point:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, commodi ex rem perspiciatis veniam quaerat itaque dolore nobis doloribus quisquam fugit enim accusantium animi reiciendis aliquam omnis fugiat libero reprehenderit. </li>
            <li><strong>Point:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorem natus sit repellendus architecto incidunt odit, commodi quo saepe sequi tempora libero voluptatem et debitis. Incidunt, numquam? Odit, iure reprehenderit? </li>
          </ul>
        </section>

        {/* History Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our History</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat soluta eveniet molestiae quam minus. Est aperiam beatae libero minima vero, 
            voluptatibus eaque suscipit hic ab natus odit velit rerum consequuntur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa facilis earum molestiae. 
            Fugit laudantium veritatis debitis, asperiores voluptatibus inventore quis nam, aperiam, suscipit facilis quaerat vitae exercitationem natus officia labore? 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, dolores alias? Quos nesciunt excepturi in autem quod corrupti quisquam? Numquam, distinctio 
            soluta magni sapiente commodi quod autem eius similique! Illum!
          </p>
        </section>

        {/* Leadership Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Leadership</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perferendis ullam, illum quaerat totam ab, accusantium placeat provident 
            alias neque atque consequuntur doloribus omnis vitae ad facere earum perspiciatis numquam.
          </p>
        </section>

        {/* Join Us Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Join Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure hic incidunt praesentium nulla? Eum rem suscipit earum. Quo ut, architecto a incidunt aliquid deserunt officia consequatur illo culpa blanditiis sed.
          </p>
        </section>
      </div>
    </div>
  );
}