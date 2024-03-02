import { createContext, useContext, useEffect, useState } from "react";
import localData from "./data/data";
import useAPI from "./useAPI";

const contextProvider = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(localData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await useAPI.get(`/fruits`);
      if (response) setData((data) => ({ ...data, fruits: response }));
    };
    fetchData();
  }, []);

  const getDataApi = useAPI.get;
  const postDataApi = useAPI.post;
  const deleteDataApi = useAPI.delete;

  return (
    <contextProvider.Provider
      value={{
        data,
        setData,
        getDataApi,
        postDataApi,
        deleteDataApi,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(contextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be used within a DataProvider");
  }
  return context;
};

export default ContextProvider;
