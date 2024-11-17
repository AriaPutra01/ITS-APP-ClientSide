import React from "react";
import {
  FaUpload,
  FaDownload,
  FaEye,
  FaPen,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { Button, ButtonProps } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

export const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="bg-blue-700 hover:bg-blue-800 flex justify-center items-center"
        ref={ref}
        {...props}>
        <FaPlus />
      </Button>
    );
  }
);

export const EditButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-yellow-400 hover:bg-yellow-500"
        ref={ref}
        {...props}>
        <FaPen />
      </Button>
    );
  }
);

export const ShowButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        ref={ref}
        {...props}>
        <FaEye />
      </Button>
    );
  }
);

export const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-red-600 hover:bg-red-700"
        ref={ref}
        {...props}>
        <FaTrash />
      </Button>
    );
  }
);

export const UploadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        ref={ref}
        {...props}>
        <FaUpload />
      </Button>
    );
  }
);

export const DownloadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        className="w-full bg-blue-800 hover:bg-blue-900"
        ref={ref}
        {...props}>
        <FaDownload />
      </Button>
    );
  }
);

export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        variant={"ghost"}
        className="hover:cursor-pointer"
        ref={ref}
        {...props}>
        <Cross1Icon />
      </Button>
    );
  }
);
