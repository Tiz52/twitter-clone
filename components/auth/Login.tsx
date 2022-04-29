import Image from "next/image";
import {signIn} from "next-auth/react";
import {FC} from "react";

interface Props {
  providers: any;
}

export const Login: FC<Props> = ({providers}) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-20">
      <Image
        height={150}
        objectFit="contain"
        src="https://rb.gy/ogau5a"
        width={150}
      />
      <div>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              className="relative inline-flex items-center justify-start px-6 py-3
						overflow-hidden font-medium transition-all bg-white
						rounded hover:bg-white group"
              onClick={() => signIn(provider.id, {callbackUrl: "/"})}
            >
              <span
                className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0]
							absolute bottom-0 left-0 -translate-x-full ease-out
							duration-500 transition-all translate-y-full mb-9 ml-9
							group-hover:ml-0 group-hover:mb-32
							group-hover:translate-x-0"
              />
              <span
                className="relative w-full text-left text-black
							transition-colors duration-300 ease-in-out
							group-hover:text-white 
							"
              >
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
