import { certificatesData } from '@/utils/data/certificates';
import GlowCard from '../../helper/glow-card';
import { BsAmd } from "react-icons/bs";
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const Certificates = () => {

  return (
    <div id='certificates' className="relative z-50  my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0  w-fit text-white px-5 py-3 text-xl rounded-md">
            Certificates
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className=" my-12">
          <Marquee
            gradient={false}
            speed={80}
            pauseOnHover={true}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction="left"
          >

            {certificatesData.map((certificate, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card mx-auto max-w-2xl sticky w-10/12"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                  <GlowCard key={certificate.id} identifier={`certificate-${certificate.id}`}>
                    <a href={certificate.link} target='_blank'>
                      <div className="p-3 relative">
                        <Image
                          src="/blur-23.svg"
                          alt="Hero"
                          width={1080}
                          height={200}
                          className="absolute bottom-0 opacity-80"
                        />
                        <div className="flex justify-center">
                          <p className="text-xs sm:text-sm text-[#16f2b3]">
                            {certificate.instituteName}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-8 px-3 py-5">
                          <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <BsAmd size={36}  className="text-violet-500 " />
                          </div>
                          <div>
                            <p className="text-base sm:text-sm mb-2 font-medium uppercase">
                              {certificate.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </GlowCard>
                </div>
              </div>
            ))}

          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Certificates;