import { useEffect, useState } from "react";
import { useAlert } from "../utils/alert";

export enum AlertType {
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export type Alert = {
  message: string;
  type: AlertType;
};

const alertTypeStyles = {
  success: {
    dialog: "border-green-900 bg-green-200",
    message: "text-green-900",
  },
  warning: {
    dialog: "border-yellow-900 bg-yellow-200",
    message: "text-yellow-900",
  },
  danger: {
    dialog: "border-red-900 bg-red-200",
    message: "text-red-900",
  },
};

const Alert = () => {
  const { alert } = useAlert();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(alert.message));
  }, [alert]);

  return (
    <dialog
      open={open}
      className={`top-2 py-4 px-6 border rounded ${
        alertTypeStyles[alert.type].dialog
      }`}
      id="alert-dialog"
    >
      <p
        className={`inline-block font-serif font-medium text-xl mr-4 ${
          alertTypeStyles[alert.type].message
        }`}
      >
        {alert.message}
      </p>
      <button className="text-xl text-stone-600" onClick={() => setOpen(false)}>
        &#x2715;
      </button>
    </dialog>
  );
};

export default Alert;
