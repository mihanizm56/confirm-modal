import { TagOptionalPropsType } from '@/_types';

type ParamsType = {
  routeName?: string;
  disabled?: boolean;
  target?: string;
  type?: string;
};

export const getTagProps = ({
  routeName,
  disabled,
  target,
  type,
}: ParamsType): TagOptionalPropsType =>
  // creating different props for different HTML tags in order to get a valid markup
  // there can't be 'href' attribute in the 'button' tag
  // there can't be 'disabled' and 'type' attributes in the 'a' tag
  routeName ? { href: routeName, target } : { disabled, type };
