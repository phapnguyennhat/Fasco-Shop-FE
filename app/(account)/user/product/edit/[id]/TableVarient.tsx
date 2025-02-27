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

interface IProps {
  field: ControllerRenderProps<any, "updateVarientDtos">
  updateAttrProductDtos :UpdateAttrProductDto[]
}

export default function TableVarient({field, updateAttrProductDtos}: IProps) {
  const updateVarientDtos = field.value as UpdateVariantDto[]


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
              {updateVarientDtos.map((updateVarientDto, indexVariant) => (
                  <FormUpdateVariant
                      key={indexVariant}
                      updateVariantDto={updateVarientDto}
                      indexVariant={indexVariant}
                      updateAttrProductDtos= {updateAttrProductDtos}
                      field={field}
                  />
              ))}
          </TableBody>
      </Table>
  );
}
