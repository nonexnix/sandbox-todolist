import { SWRConfig, SWRConfiguration } from "swr";
import fetcher from "../utilities/fetcher";

interface Props {
  children: React.ReactNode;
  fallback: any;
}

const SWRProvider: React.FC<Props> = ({ children, fallback }) => {
  const configs: SWRConfiguration = {
    fallback,
    fetcher,
    revalidateOnMount: false,
  };
  return <SWRConfig value={{ ...configs }}>{children}</SWRConfig>;
};

export default SWRProvider;
