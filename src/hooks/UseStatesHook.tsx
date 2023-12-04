import { useState } from "react";

export default function UseStatesHook<Type>() {
  const [data, setData] = useState<Type>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    refresh,
    setRefresh,
  };
}
