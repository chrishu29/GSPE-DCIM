// src/utils/debounce.ts

/**
 * Creates a debounced function that delays invoking the provided function
 * until at least `wait` milliseconds have elapsed since the last invocation.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @return Returns the new debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function(...args: Parameters<T>): void {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => func(...args), wait);
    };
}
