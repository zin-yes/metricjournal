import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Image from "next/image";

const connectorVariants = cva(
  "w-full flex flex-col justify-center items-center m-0 p-0",
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
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_6)">
              <path
                d="M8.28004 0C8.28004 0.320918 8.18486 0.638694 7.99992 0.935185C7.81498 1.23167 7.54391 1.50107 7.20219 1.72799C6.86048 1.95491 6.4548 2.13492 6.00832 2.25773C5.56185 2.38054 5.0833 2.44375 4.60004 2.44375C4.11679 2.44375 3.63824 2.38054 3.19176 2.25773C2.74529 2.13492 2.3396 1.95491 1.9979 1.72799C1.65617 1.50107 1.3851 1.23167 1.20017 0.935185C1.01523 0.638694 0.920044 0.320918 0.920044 0H4.60004H8.28004Z"
                fill="#C3CAC8"
              />
              <path d="M4.59998 1.22186V39.1" stroke="#C3CAC8" />
            </g>
            <defs>
              <clipPath id="clip0_8_6">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="text-[#c3cac8] text-sm">{text}</span>
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_2)">
              <path d="M4.59998 0V37.8781" stroke="#C3CAC8" />
              <path
                d="M0.920044 39.1C0.920044 38.7791 1.01523 38.4613 1.20017 38.1648C1.38511 37.8684 1.65617 37.5989 1.9979 37.372C2.3396 37.1451 2.74529 36.9651 3.19176 36.8422C3.63824 36.7194 4.11679 36.6562 4.60004 36.6562C5.0833 36.6562 5.56185 36.7194 6.00832 36.8422C6.4548 36.9651 6.86048 37.1451 7.20219 37.372C7.54391 37.5989 7.81498 37.8696 7.99992 38.1648C8.18486 38.4613 8.28004 38.7791 8.28004 39.1H4.60004H0.920044Z"
                fill="#C3CAC8"
              />
            </g>
            <defs>
              <clipPath id="clip0_8_2">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    case "no_text":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <svg
            width="10"
            height="79"
            viewBox="0 0 10 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_10)">
              <path d="M4.59998 0V77.6" stroke="#C3CAC8" />
              <path
                d="M8.28004 0C8.28004 0.320918 8.18486 0.638694 7.99992 0.935185C7.81498 1.23167 7.54391 1.50107 7.20219 1.72799C6.86048 1.95491 6.4548 2.13492 6.00832 2.25773C5.56185 2.38054 5.0833 2.44375 4.60004 2.44375C4.11679 2.44375 3.63824 2.38054 3.19176 2.25773C2.74529 2.13492 2.3396 1.95491 1.9979 1.72799C1.65617 1.50107 1.3851 1.23167 1.20017 0.935185C1.01523 0.638694 0.920044 0.320918 0.920044 0H4.60004H8.28004Z"
                fill="#C3CAC8"
              />
              <path
                d="M0.920044 78.4437C0.920044 78.1229 1.01523 77.8051 1.20017 77.5085C1.38511 77.2121 1.65617 76.9427 1.9979 76.7158C2.3396 76.4889 2.74529 76.3089 3.19176 76.186C3.63824 76.0632 4.11679 76 4.60004 76C5.0833 76 5.56185 76.0632 6.00832 76.186C6.4548 76.3089 6.86048 76.4889 7.20219 76.7158C7.54391 76.9427 7.81498 77.2133 7.99992 77.5085C8.18486 77.8051 8.28004 78.1229 8.28004 78.4437H4.60004H0.920044Z"
                fill="#C3CAC8"
              />
            </g>
            <defs>
              <clipPath id="clip0_8_10">
                <rect width="9.2" height="78.2" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    case "top_only":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_6)">
              <path
                d="M8.28004 0C8.28004 0.320918 8.18486 0.638694 7.99992 0.935185C7.81498 1.23167 7.54391 1.50107 7.20219 1.72799C6.86048 1.95491 6.4548 2.13492 6.00832 2.25773C5.56185 2.38054 5.0833 2.44375 4.60004 2.44375C4.11679 2.44375 3.63824 2.38054 3.19176 2.25773C2.74529 2.13492 2.3396 1.95491 1.9979 1.72799C1.65617 1.50107 1.3851 1.23167 1.20017 0.935185C1.01523 0.638694 0.920044 0.320918 0.920044 0H4.60004H8.28004Z"
                fill="#C3CAC8"
              />
              <path d="M4.59998 1.22186V39.1" stroke="#C3CAC8" />
            </g>
            <defs>
              <clipPath id="clip0_8_6">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    case "bottom_only":
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_2)">
              <path d="M4.59998 0V37.8781" stroke="#C3CAC8" />
              <path
                d="M0.920044 39.1C0.920044 38.7791 1.01523 38.4613 1.20017 38.1648C1.38511 37.8684 1.65617 37.5989 1.9979 37.372C2.3396 37.1451 2.74529 36.9651 3.19176 36.8422C3.63824 36.7194 4.11679 36.6562 4.60004 36.6562C5.0833 36.6562 5.56185 36.7194 6.00832 36.8422C6.4548 36.9651 6.86048 37.1451 7.20219 37.372C7.54391 37.5989 7.81498 37.8696 7.99992 38.1648C8.18486 38.4613 8.28004 38.7791 8.28004 39.1H4.60004H0.920044Z"
                fill="#C3CAC8"
              />
            </g>
            <defs>
              <clipPath id="clip0_8_2">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    default:
      return (
        <div className={cn(connectorVariants({ variant }), className)}>
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_6)">
              <path
                d="M8.28004 0C8.28004 0.320918 8.18486 0.638694 7.99992 0.935185C7.81498 1.23167 7.54391 1.50107 7.20219 1.72799C6.86048 1.95491 6.4548 2.13492 6.00832 2.25773C5.56185 2.38054 5.0833 2.44375 4.60004 2.44375C4.11679 2.44375 3.63824 2.38054 3.19176 2.25773C2.74529 2.13492 2.3396 1.95491 1.9979 1.72799C1.65617 1.50107 1.3851 1.23167 1.20017 0.935185C1.01523 0.638694 0.920044 0.320918 0.920044 0H4.60004H8.28004Z"
                fill="#C3CAC8"
              />
              <path d="M4.59998 1.22186V39.1" stroke="#C3CAC8" />
            </g>
            <defs>
              <clipPath id="clip0_8_6">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="text-[#ABB1B0] text-sm">{text}</span>
          <svg
            width="10"
            height="40"
            viewBox="0 0 10 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8_2)">
              <path d="M4.59998 0V37.8781" stroke="#C3CAC8" />
              <path
                d="M0.920044 39.1C0.920044 38.7791 1.01523 38.4613 1.20017 38.1648C1.38511 37.8684 1.65617 37.5989 1.9979 37.372C2.3396 37.1451 2.74529 36.9651 3.19176 36.8422C3.63824 36.7194 4.11679 36.6562 4.60004 36.6562C5.0833 36.6562 5.56185 36.7194 6.00832 36.8422C6.4548 36.9651 6.86048 37.1451 7.20219 37.372C7.54391 37.5989 7.81498 37.8696 7.99992 38.1648C8.18486 38.4613 8.28004 38.7791 8.28004 39.1H4.60004H0.920044Z"
                fill="#C3CAC8"
              />
            </g>
            <defs>
              <clipPath id="clip0_8_2">
                <rect width="9.2" height="39.1" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
  }
}

export { Connector, connectorVariants };
