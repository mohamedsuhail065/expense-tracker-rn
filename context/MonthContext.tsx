import { createContext } from "react";

type MonthContextType = {
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
};

const MonthContext = createContext<MonthContextType>({
  month: "",
  setMonth: () => {},
});

export default MonthContext;
