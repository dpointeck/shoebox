import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, isFocused = false, ...props }: InputProps, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, []);

        return (
            <input
                {...props}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={localRef}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
