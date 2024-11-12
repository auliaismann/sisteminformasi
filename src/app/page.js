import Head from "next/head";
import { Aboutus, Hero, Navbar, Features, Footer} from "./components";


export default function Home() {
  return (
    <div>
      <Head>
        <title>EduNotes</title>
      </Head>

    <main className="bg-white">
      <div className="px-5">
      <Navbar/>
      <Hero/>
      <Aboutus/>
      <Features/>
      <Footer/>
      </div>
    </main>

    </div>
  );
}
