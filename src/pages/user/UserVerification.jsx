import { useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyUserAction } from "../../features/user/userAction";

export const UserVerification = () => {
  const [response, setResponse] = useState();
  const [searchParams] = useSearchParams();

  const c = searchParams.get("c");
  const e = searchParams.get("e");

  let shouldCall = useRef(true);

  useEffect(() => {
    const getServerResponse = async () => {
      const data = await verifyUserAction({ c, e });
      console.log(data);
      setResponse(data);
    };

    if (shouldCall.current) {
      getServerResponse();
      shouldCall.current = false;
    }
  }, [c, e]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="d-flex flex-column align-items-center">
        <div className="mt-4">
          {response?.message ? (
            <Alert
              className={response?.status === "success" ? "success" : "danger"}
            >
              {response?.message}
            </Alert>
          ) : (
            <>
              <Spinner variant="warning" className="fs-1" />
              Please wait while we are verifying your link
            </>
          )}
        </div>
      </div>
    </div>
  );
};
