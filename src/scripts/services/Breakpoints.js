/* global window */

import { breakpoints } from '../../settings.json';

const checkBreakpoint = (breakpoint) => {
  if (breakpoints[breakpoint]) {
    return window.innerWidth > breakpoints[breakpoint];
  }
  return false;
};

export { checkBreakpoint };
export default breakpoints;
