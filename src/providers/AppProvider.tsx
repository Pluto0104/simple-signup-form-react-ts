import { createContext, useState, useEffect, useCallback } from "react";

interface IAppContext {
  countries: CountryType[];
  userInfo: UserType;
  getCountryName: (code: string) => string;
  updateUserInfo: (data: Partial<UserType>) => void;
}

// Create a context
const AppContext = createContext<IAppContext>({
  countries: [],
  userInfo: { username: "", email: "", country: "", password: "" },
  getCountryName: () => "",
  updateUserInfo: () => {},
});

// Create a provider component
const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [userInfo, setUserInfo] = useState<UserType>({
    username: "",
    email: "",
    country: "",
    password: "",
  });

  const fetchCountryData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data: CountryType[] = await res.json();
      setCountries(
        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      );
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const getCountryName = useCallback(
    (code: string) => {
      return countries.find((item) => item.cca2 === code)?.name.common || "";
    },
    [countries]
  );

  const updateUserInfo = useCallback((data: Partial<UserType>) => {
    setUserInfo((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <AppContext.Provider
      value={{ countries, getCountryName, userInfo, updateUserInfo }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
