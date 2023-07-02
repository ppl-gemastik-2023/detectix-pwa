import SearchBar from "@/components/Home/SearchBar";
import { useAuth } from "@/context/AuthContext";
import withSession from "@/hoc/withSession"
import { Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel"
import { Montserrat, Poppins } from "next/font/google"
import { BiSearchAlt } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs"
import Image from "next/image";
import { useEffect, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"] });
const poppins = Poppins({ weight: "700", subsets: ["latin", "latin-ext"] })
export default withSession(function Home() {
  const { user } = useAuth();

  const [reminders, setReminders] = useState<{ name: string; time: string; isDone: boolean }[]>([]);

  useEffect(() => {
    localStorage.getItem("reminders") && setReminders(JSON.parse(localStorage.getItem("reminders") as string).filter((val: { name: string; time: string; isDone: boolean }) => val.isDone === true))
  }, [])

  return (
    <main className="flex flex-col min-h-screen gap-5 p-5 pb-24">
      <section>
        <h1 style={montserrat.style} className="text-lg font-bold overflow-ellipsis font-montserrat">
          <span className="font-normal">Halo, </span>
          <span>{" "}{user?.displayName}</span>
        </h1>
      </section>
      <SearchBar />
      <section className="mx-2 my-5">
        <article className="min-h-[100px] p-5 rounded-4xl shadow">
          <h1 style={poppins.style} className="p-3 text-[#333] text-xl">Analisa Komposisi</h1>
          <button style={montserrat.style} className="flex text-sm px-5 py-3 font-semibold items-center gap-2 bg-[#36AE7C] w-full rounded-full text-white">
            <span><BsQrCodeScan className="font-bold" /></span>
            <span>Pindai Kode BPOM</span>
          </button>
          <button style={montserrat.style} className="flex font-semibold mt-3 gap-2 py-3 px-5 w-full rounded-full items-center text-white bg-[#53D472]">
            <span className=""><BiSearchAlt /></span>
            <span className="text-sm">Input Manual Komposisi</span>
          </button>
        </article>
      </section>
      <section className="p-5 mx-2 mt-6">
        <h1 style={poppins.style} className="mb-4 text-[#333] text-xl">Alergen</h1>
        <Carousel
          height={200}
          withControls={false}
          slideSize={"33.333333%"}
          slideGap="md"
          align="start"
          dragFree
        >
          <Carousel.Slide className="">
            <section style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353]">
              <Image alt="aspirin" src="/aspirin.jpg" width={500} height={500} />
              <p className="p-3">Aspirin</p>
            </section>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <section style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353]">
              <Image alt="aspirin" src="/aspirin.jpg" width={500} height={500} />
              <p className="p-3">Aldesulfone</p>
            </section>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <section style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353]">
              <Image alt="aspirin" src="/aspirin.jpg" width={500} height={500} />
              <p className="p-3">Penicilin</p>
            </section>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <section style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353]">
              <Image alt="aspirin" src="/aspirin.jpg" width={500} height={500} />
              <p className="p-3">Acetaminophen</p>
            </section>
          </Carousel.Slide>
        </Carousel>
      </section>
      <section style={montserrat.style}>
        <h1 className="text-xl px-5 mx-2 text-[#333] font-bold">Jadwal Konsumsi Obat</h1>
        <ul className="flex flex-col gap-3 mt-2">
          {reminders.length > 0 ?
            reminders.map((val, index) => (
              <li key={index} className="flex gap-4 p-2 border-2 rounded-md border-zinc-300">
                <div className="flex flex-col items-center justify-center px-3 py-0.5 bg-green-100 border-2 border-green-300 rounded">
                  <p className="text-xl">{new Date().getDate()}</p>
                  <p className="text-xs">{val.time}</p>
                </div>
                <div className="flex flex-col">
                  <Badge size="xs" color="green" variant="outline" className="mb-1 w-max">
                    <p className="text-xs">{new Date().toLocaleTimeString("id-ID").slice(0, 5)}</p>
                  </Badge>
                  <p className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap text-sm">{val.name}</p>
                </div>
              </li>
            ))
            :
            <p className="text-sm text-center text-zinc-500">Tidak ada obat yang harus dikonsumsi</p>
          }
        </ul>

      </section>
    </main>
  )
})
