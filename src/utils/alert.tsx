import React, { createContext, useContext, useState } from "react";
import { Alert, AlertType } from "../components/alert-dialog";

export interface AlertContextInterface {
  alert: Alert;
  setAlert: (alert: Alert) => void;
}

interface AlertProviderProps {
  children: React.ReactNode;
}

const AlertContext = createContext<AlertContextInterface>({} as AlertContextInterface);

export const AlertProvider = (props: AlertProviderProps) => {
  const [alert, setAlert] = useState<Alert>({
    message: "",
    type: AlertType.Success,
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
