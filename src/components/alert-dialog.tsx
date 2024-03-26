import { useAlert } from "../utils/alert";

export enum AlertType {
  Success = "success",
}

export type Alert = {
  message: string;
  type: AlertType;
};

const Alert = () => {
  const { alert } = useAlert();

  const closeDialog = () => {
    let dialog = document.getElementById("alert-dialog") as HTMLDialogElement;
    dialog && dialog.close();
  };
  return (
    alert.message && (
      <dialog open className={alert.type} id="alert-dialog">
        <p>{alert.message}</p>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    )
  );
};

export default Alert;
