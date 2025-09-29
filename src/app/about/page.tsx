import { Heart, Users, BookOpen, Cross, Globe, Handshake } from "lucide-react";
import Image from "next/image";

export default function About() {
  const leadership = [
    {
      name: "Rev. Francisca Contreras",
      title: "Senior Pastor",
      bio: "Rev. Francisca has served Grace Community Church for 15 years. She is passionate about expository preaching and discipleship.",
      imageUrl: "/pastor-1.jpg",
    },
    {
      name: "Lic. Saul Contreras",
      title: "Associate Pastor",
      bio: "Pastor Saul leads our worship ministry and is passionate about fostering a deep connection with God through music.",
      imageUrl: "/pastor-2.jpg",
    },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/placeholder-2.jpg"
            width={1920}
            height={1080}
            alt="Cross with sunlight"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-serif mb-6">About Grace Community Church</h1>
          <p className="text-xl text-blue-100">
            Discover our heart, our mission, and the community that makes us who we are.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-slate-800 mb-6">Who We Are</h2>
              <p className="text-lg text-slate-600 mb-6">
                Grace Community Church is a vibrant Pentecostal congregation that has been 
                serving our community for over 25 years. We are a diverse family of believers 
                united by our love for Jesus Christ and our commitment to the Gospel.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Our church is characterized by passionate worship, authentic community, 
                biblical teaching, and a heart for service. We believe in the power of 
                the Holy Spirit to transform lives and communities.
              </p>
              <p className="text-lg text-slate-600">
                Whether you&apos;re a longtime believer or just beginning to explore faith, 
                you&apos;ll find a warm welcome and a place to grow in your relationship with God.
              </p>
            </div>
            <div>
              <Image
                src="/placeholder-1.jpg"
                alt="Church worship service"
                className="rounded-lg shadow-lg w-full h-auto"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We exist to glorify God by making disciples who love Jesus, love people, and serve the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="p-8 text-center">
                <Cross className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Christ-Centered</h3>
                <p className="text-slate-600">
                  Jesus is the foundation of everything we do. We seek to honor Him 
                  in our worship, teaching, and daily lives.
                </p>
              </div>
            </div>
            
            <div>
              <div className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Bible-Based</h3>
                <p className="text-slate-600">
                  Scripture is our authority for faith and practice. We believe in 
                  teaching and living by God&apos;s Word.
                </p>
              </div>
            </div>
            
            <div>
              <div className="p-8 text-center">
                <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Spirit-Filled</h3>
                <p className="text-slate-600">
                  We embrace the gifts and power of the Holy Spirit in our worship, 
                  ministry, and personal transformation.
                </p>
              </div>
            </div>
            
            <div>
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Community-Focused</h3>
                <p className="text-slate-600">
                  We believe in authentic relationships and supporting one another 
                  through life&apos;s joys and challenges.
                </p>
              </div>
            </div>
            
            <div>
              <div className="p-8 text-center">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Mission-Minded</h3>
                <p className="text-slate-600">
                  We are called to share the Gospel both locally and globally, 
                  making disciples of all nations.
                </p>
              </div>
            </div>
            
            <div>
              <div className="p-8 text-center">
                <Handshake className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-4">Grace-Filled</h3>
                <p className="text-slate-600">
                  We extend the same grace we&apos;ve received from God to others, 
                  creating a welcoming environment for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">What We Believe</h2>
            <p className="text-xl text-slate-600">
              Our beliefs are rooted in Scripture and the historic Christian faith.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-3">The Trinity</h3>
              <p className="text-slate-600">
                We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit, 
                each fully God yet distinct in their roles within the Godhead.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-3">Salvation by Grace</h3>
              <p className="text-slate-600">
                Salvation is a gift from God received through faith in Jesus Christ alone. 
                It is not earned by works but freely given to all who believe.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-3">The Authority of Scripture</h3>
              <p className="text-slate-600">
                The Bible is the inspired, infallible Word of God and our final authority 
                for all matters of faith and Christian living.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-3">The Gifts of the Spirit</h3>
              <p className="text-slate-600">
                We believe in the baptism of the Holy Spirit and the continuation of 
                spiritual gifts for the edification of the church and the glory of God.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-3">The Great Commission</h3>
              <p className="text-slate-600">
                Every believer is called to share the Gospel and make disciples, 
                both in our local community and around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Our Leadership</h2>
            <p className="text-xl text-slate-600">
              Meet the pastoral team called to shepherd our congregation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {leadership.map((leader) => (
              <div key={leader.name} className="mb-12">
                <div className="p-8 text-center">
                  <div className="mb-6">
                    <Image
                      src={leader.imageUrl}
                      width={128}
                      height={128}
                      alt={leader.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{leader.name}</h3>
                  <p className="text-blue-600 mb-4">{leader.title}</p>
                  <p className="text-slate-600 text-sm">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}