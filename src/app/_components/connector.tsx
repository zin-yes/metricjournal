import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Image from "next/image";

const connectorVariants = cva(
  "w-full flex flex-col justify-center items-center",
  {
    variants: {
      variant: {
        default: "",
        no_text: "",
        top_only: "",
        bottom_only: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof connectorVariants> {
  text?: string;
}

function Connector({ text, className, variant, ...props }: ConnectorProps) {
  switch (variant) {
    case "default":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <Image
            src="/connector-top.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
          <span className="text-[#c3cac8] text-sm">{text}</span>
          <Image
            src="/connector-bottom.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
        </div>
      );
    case "no_text":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <Image
            src="/connector.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={34 * 2.3}
          />
        </div>
      );
    case "top_only":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <Image
            src="/connector-top.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
        </div>
      );
    case "bottom_only":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <Image
            src="/connector-bottom.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
        </div>
      );
    default:
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <Image
            src="/connector-top.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
          <span className="text-[#ABB1B0] text-sm">{text}</span>
          <Image
            src="/connector-bottom.svg"
            alt="connector graphic"
            width={4 * 2.3}
            height={17 * 2.3}
          />
        </div>
      );
  }
}

export { Connector, connectorVariants };
