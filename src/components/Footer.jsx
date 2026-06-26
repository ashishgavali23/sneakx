import { Instagram, Linkedin, Twitter, Github } from "lucide-react";

function Footer(){
    return(
        <footer className="bg-black border-t border-white/10 px-8 md:px-16 py-16">

            <div className="grid md:grid-cols-4 gap-10">

                {/*Logo*/}
                <div>
                    <h1 className="text-white text-4xl font-black">
                        SNEAKS
                    </h1>

                    <p className="text-gray-400 mt-5 leading-7">
                        Premium sneakers crafted for comfort,
                        performance and modern streetwear.
                    </p>
                </div>

                    {/*Shop*/}
                    <div>
                        <h2 className="text-white font-bold text-xl mb-5">
                            Shop
                        </h2>

                        <ul className="space-y-3 text-gray-400">
                            <li>Running</li>
                            <li>Sneakers</li>
                            <li>Sports</li>
                            <li>Limited Edition</li>
                        </ul>
                    </div>

                    {/*Company*/}
                    <div>
                        <h2 className="text-white font-bold text-xl mb-5">
                            Company
                        </h2>

                        <ul className="space-y-3 text-gray-400">
                            <li>About</li>
                            <li>Careers</li>
                            <li>Contact</li>
                            <li>Support</li>
                        </ul>
                    </div>

                    {/*Social*/}
                    <div>
                        <h2 className="text-white font-bold text-xl mb-5">
                                Follow Us
                        </h2>

                        <div className="flex gap-5">
                            <Instagram className="text-white hover:scale-110 transition cursor-pointer" />
                            <Twitter className="text-white hover:scale-110 transition cursor-pointer" />
                            <Linkedin className="text-white hover:scale-110 transition cursor-pointer" />
                            <Github className="text-white hover:scale-110 transition cursor-pointer" />
                    </div>

                    </div>

                    

            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">
                  © 2026 Sneaks. All Rights Reserved.
            </div>

        </footer>
    )
}
export default Footer;