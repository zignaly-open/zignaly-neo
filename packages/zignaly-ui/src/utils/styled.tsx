import React from "react";

/**
 * Makes a conditional render of styles, this function is implemented to prevent renderings "undefined" within the CSS and to make the reading more comfortable.
 * @param cond Operation or conditional.
 * @param primaryQuery code to render within the operation logic. It acts as the first value when a elseif is detected.
 * @param secondaryQuery secondary code, optional and applicable as a else-if. Render CSS.
 * @returns {string} One or the other query depending on the conditional we assign.
 *
 * @deprecated
 */
export const styledIf = (cond: any, primaryQuery: string, secondaryQuery?: string) => {
  return !secondaryQuery ? (cond ? primaryQuery : "") : cond ? primaryQuery : secondaryQuery;
};

export const withAttrs =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component: React.ElementType, attrs: any) => (props: any) => <Component {...attrs} {...props} />;
