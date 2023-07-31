import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../services/api-client";

interface ApiResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(
        () => {
            const controller = new AbortController();

            setLoading(true);
            apiClient
                .get<ApiResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
                .then((res) => {
                    setData(res.data.results);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setLoading(false);
                });

            return () => controller.abort();
        },
        deps ? [...deps] : [endpoint]
    );

    return { data, error, isLoading };
};

export default useData;
