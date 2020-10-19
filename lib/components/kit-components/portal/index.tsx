import React, { PureComponent, Props } from 'react';
import { uniqueId } from 'lodash-es';
import { createPortal } from 'react-dom';
import { NumberRangeToHundredType } from './_types';

type PropsType = Props<any> & {
  /** portal body */
  children: React.ReactNode;
  /** prefix of portal */
  prefix: string;
  /** z-index of portal container */
  zIndex?: NumberRangeToHundredType;
};

// default z-index for portal container
const DEFAULT_Z_INDEX = 0;
const RELATIVE_POSITION = 'relative';

export class Portal extends PureComponent<PropsType> {
  portalContainer: HTMLElement;

  portalElement: HTMLElement;

  constructor(props: PropsType) {
    super(props);
    const rootPortalPrefix = `Portal-${props.prefix}`;
    const rootPortalZIndex = `${this.props.zIndex || DEFAULT_Z_INDEX}`;

    // lets find parent container for this prefix
    this.portalContainer = document.getElementById(
      rootPortalPrefix,
    ) as HTMLElement; // that element must always be - see below

    if (!this.portalContainer) {
      // if not found then create
      this.portalContainer = document.createElement('div');
      this.portalContainer.setAttribute('id', rootPortalPrefix);
      this.portalContainer.style.zIndex = rootPortalZIndex;
      this.portalContainer.style.position = RELATIVE_POSITION;
      this.portalContainer.className = rootPortalPrefix;

      const body = document.body;
      body.appendChild(this.portalContainer);
    }

    // create the children
    this.portalElement = document.createElement('div');
    this.portalElement.className = `${rootPortalPrefix}__${uniqueId()}`;
  }

  componentDidMount() {
    // Mount children
    this.portalContainer.appendChild(this.portalElement);
  }

  componentWillUnmount() {
    // remove children
    this.portalElement.remove();
  }

  render() {
    return createPortal(this.props.children, this.portalElement);
  }
}
