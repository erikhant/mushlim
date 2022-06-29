const { useRef, useCallback } = require("react");

export const useIntersectObserver = (callback, dependencies) => {
    const observer = useRef();
    const cbObserve = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            callback(entries)
        });
        if (node) observer.current.observe(node);
    }, [...dependencies]);

}
