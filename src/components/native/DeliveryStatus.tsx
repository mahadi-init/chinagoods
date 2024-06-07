import { useEffect, useState } from "react";
// import {
//   STEADFAST_API_KEY,
//   STEADFAST_BASE_URL,
//   STEADFAST_SECRECT_KEY,
// } from "../../site-config";

export default function DeliveryStatus({
  trackingCode,
}: {
  trackingCode?: string;
}) {
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    // async function getStatus() {
    //   const res = await fetch(
    //     `${STEADFAST_BASE_URL}/api/v1/status_by_trackingcode/${trackingCode}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Api-Key": STEADFAST_API_KEY,
    //         "Secret-Key": STEADFAST_SECRECT_KEY,
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   if (res.status === 200) {
    //     setStatus(data.delivery_status);
    //   }
    //   return res;
    // }
    // getStatus();
  }, [trackingCode]);

  if (!status) {
    return <p className="font-medium text-yellow-600">LOADING..</p>;
  }

  return <p className="font-medium">{status?.toUpperCase()}</p>;
}
