import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                {/* Logo Section */}
                <div className="flex justify-center py-4">
                    <Link href="/">
                        <img 
                            src="/casa-de-dios-logo.png" 
                            alt="Casa de Dios Logo" 
                            className="h-20 transition-transform hover:scale-105 ease-in-out duration-300" 
                        />
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="border-t border-gray-200">
                    <ul className="flex justify-center gap-8 py-4">
                        {[
                            { label: "About", href: "../about" },
                            { label: "Location and Contact", href: "../location-contact" },
                            { label: "Ministries and Groups", href: "#ministries" },
                            { label: "Events and Calendar", href: "../events-calendar" },
                            { label: "Prayer Requests", href: "#prayer" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    <span className="text-lg font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}