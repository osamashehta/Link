import { useState } from "react";
import { toast } from "react-toastify";

const ReportModal = ({
  reportReason,
  setReportReason,
}: {
  reportReason: boolean;
  setReportReason: (reportReason: boolean) => void;
}) => {
  const [reason, setReason] = useState("");

  const handleReport = () => {
    const promise = new Promise((resolve, reject) => {
      if (reason.length === 0) {
        toast.error("Please enter a reason");
        return reject("No reason provided");
      }
      setTimeout(() => {
        toast.success("Your report has been submitted");
        resolve(true);
      }, 1000);
    });

    promise
      .then(() => {
        setReportReason(false);
      })
      .catch((err) => {
        console.error("Report failed:", err);
      });
  };

  return (
    <>
      {reportReason && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white relative rounded-md p-4 max-w-[400px] w-full flex flex-col gap-4 justify-center items-center">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setReportReason(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#EE0028"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"
                />
                <path
                  fill="#EE0028"
                  d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </div>
            <h1>Report Post</h1>
            <div className="w-full">
              <textarea
                name="Report Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                id=""
                rows={10}
                className="w-full border border-gray-600/[0.4] rounded-md p-2"
              ></textarea>
            </div>
            <button
              onClick={handleReport}
              className="bg-blue-500 cursor-pointer  text-white px-4 py-2 rounded-md"
            >
              Report
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModal;
