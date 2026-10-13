import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(callback: T, delay: number): T {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: unknown[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                (callback as (...args: unknown[]) => void)(...args);
            }, delay);
        },
        [callback, delay]
    ) as T;
}