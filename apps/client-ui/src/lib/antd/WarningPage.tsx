"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const WarningPage = () => {
  const router = useRouter();
  return (
    <Result
      status="403"
      title={<div className="text-slate-300">403</div>}
      subTitle={
        <div className="text-white">
          Sorry, you are not authorized to access this page.
        </div>
      }
      extra={
        <Button
          className="bg-blue-700"
          type="primary"
          onClick={() => router.push("/")}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default WarningPage;
