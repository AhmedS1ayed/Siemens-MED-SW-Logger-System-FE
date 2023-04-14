import React from "react";
import { useLocation } from "react-router-dom";

export default function Testcase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("testsuitId");

  return <div>test case inside test suite id = {id}</div>;
}
