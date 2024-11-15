import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import clsx from "clsx";
import { useFormStore } from "@/features/MainData/store/FormStore";

interface FormConfig {
  type: string;
  onSubmit: (values: any) => void;
}

export const DynamicForm = ({ type, onSubmit }: FormConfig) => {
  // FIELD DAN DETAIL DATA DARI PAGE
  const { initialData, fields } = useFormStore();

  // UNTUK VALIDASI ZOD
  const formSchema = z.object(
    fields.reduce((acc: Record<string, any>, field) => {
      acc[field.name as any] = field.validation;
      return acc;
    }, {})
  );

  // DEFAULT VALUE KOSONG
  const resetValue = fields.reduce((acc: Record<string, any>, field) => {
    acc[field.name as any] = "";
    return acc;
  }, {});

  // REACT HOOK FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      Object.keys(initialData).length === 0 ? resetValue : initialData,
  });

  // RESET VALUE SETELAH SUBMIT
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid ${
          fields.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } gap-[1rem]`}>
        {fields.map((col, idx) => {
          switch (col.type) {
            case "date":
              return (
                <FormField
                  key={idx}
                  control={form.control}
                  name={col.name as string}
                  render={({ field: { value, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>{col.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            value
                              ? new Date(value).toISOString().split("T")[0]
                              : ""
                          }
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            case "select":
              return (
                <FormField
                  key={idx}
                  control={form.control}
                  name={col.name as string}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{col.label}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={field.value ? field.value : "Pilih"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {col.options?.map((option, optionIdx) => (
                            <SelectItem key={optionIdx} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            case "file":
              return (
                <FormField
                  key={idx}
                  control={form.control}
                  name={col.name as string}
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>{col.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(event) =>
                            onChange(
                              event.target.files ? event.target.files[0] : null
                            )
                          }
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            default:
              return (
                <FormField
                  key={idx}
                  control={form.control}
                  name={col.name as string}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{col.label}</FormLabel>
                      <FormControl>
                        <Input type={col.type} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
          }
        })}
        <Button
          type="submit"
          className={clsx("w-full col-span-2", {
            "bg-blue-700 hover:bg-blue-800": type === "add",
            "bg-yellow-600 hover:bg-yellow-700": type === "edit",
            "bg-green-600 hover:bg-green-700": type === "upload",
          })}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
