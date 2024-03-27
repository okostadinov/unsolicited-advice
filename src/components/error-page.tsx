import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "unknown error";
  }

  return (
    <div className="bg-slate-100 flex-1 h-full p-20 flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-semibold text-stone-800">Oh no!</h1>
      <p className="text-xl text-stone-800">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl text-stone-800 font-mono font-medium">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
