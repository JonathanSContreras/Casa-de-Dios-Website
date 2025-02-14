import Header from "@/app/header/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex items-center justify-center mt-60">
            <div>
                {/* Name */}
                <div className="text-5xl font-bold text-center"> Iglesia Casa de Dios </div>

                {/* Socials */}
                <div className="flex justify-center items-center p-5">
                    <ul className="flex gap-32 p-3">
                        {/* Facebook */}
                        <li className="group relative">
                            {/* reference (old): <a className="btn transition-transform duration-300 ease-in-out block" href="https://github.com/jonathanscontreras"> */}
                            <a href="#">
                                <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                                    <i className="fa-brands fa-facebook text-3xl hover:animate-pulse ease-in-out"></i>
                                </span>
                            </a>
                        </li>
                        {/* Instagram */}
                        <li className="group relative">
                            <a href="#">
                                <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                                    <i className="fa-brands fa-instagram text-3xl hover:animate-pulse ease-in-out"></i>
                                </span>
                            </a>
                        </li>
                        {/* Youtube */}
                        <li className="group relative">
                            <a href="#">
                                <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                                    <i className="fa-brands fa-youtube text-3xl hover:animate-pulse ease-in-out"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
);
}