import { ControllerRenderProps } from "react-hook-form"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FormUpdateVariant from "../../create/FormUpdateVariant";
import { UpdateAttrProductDto, UpdateVariantDto } from "./schema";
import { useMemo } from "react";
import { cartesian } from "@/lib/utils";

interface IProps {
  field: ControllerRenderProps<any, "updateVarientDtos">
  updateAttrProductDtos :UpdateAttrProductDto[]
}

export default function TableVarient({ field, updateAttrProductDtos }: IProps) {
    const updateVarientDtos = field.value as UpdateVariantDto[];

    const cartesianValues: IValueAttr[][] = useMemo(() => {
        const values = updateAttrProductDtos.map((item) =>
            item.updateValueAttrDtos.map((updateValue) => ({
                value: updateValue.value,
                id: updateValue.id,
            })),
        );
        return cartesian(values);
    }, [updateAttrProductDtos]);

    return (
        <Table className="  md:pt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Variation</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available Quantity</TableHead>
                    <TableHead>Discount Price</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {updateVarientDtos.map((_, indexVariant) => (
                    <FormUpdateVariant
                        key={indexVariant}
                        indexVariant={indexVariant}
                        field={field}
                        valueAttrs={cartesianValues[indexVariant]}
                    />
                ))}
            </TableBody>
        </Table>
    );
}
