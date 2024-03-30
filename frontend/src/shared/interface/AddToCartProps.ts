import { ReactElement } from "react";
import { Book } from "./Books";
import { IconBaseProps } from "react-icons";

export interface AddToCartProps {
  btnStyles: string;
  book: Book;
  id: string;
  icon?: ReactElement<IconBaseProps>;
  name?: string;
}
